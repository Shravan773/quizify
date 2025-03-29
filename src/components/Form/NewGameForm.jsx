import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

import JsxForm from './JsxForm'
import { IoCloseSharp } from 'react-icons/io5'
import playSound from '@/helpers/playSound'
import queryValidator from '@/helpers/gameConfig'
import categoriesJSON from '@/assets/categories.json'
import { useBoundStore } from '@/store/useBoundStore'

export default function NewGameForm () {
	const { getQuestions, cleanQuestions, queries, setQueries, cleanWildCards } = useBoundStore(state => state)
	const [nowQueries, setNowQueries] = useState(queries)
	const router = useRouter()
	const dialog = useRef(null)

	useEffect(() => setNowQueries(queries), [queries])

	useEffect(() => {
		if (router.isReady && router.pathname === '/play') {
			setQueries(queryValidator(router.query))
		}
	}, [router.isReady])

	function handleInputs (e) {
		if (e.target.name === 'infinitymode' || e.target.name === 'timemode') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.name === 'infinitymode' ? !e.target.checked : e.target.checked })
		}

		if (e.target.name === 'categories') {
			e.target.checked ? playSound('pop-up-on') : playSound('pop-up-off')
			return setNowQueries({ ...nowQueries, [e.target.name]: e.target.checked ? [...nowQueries.categories, e.target.value] : nowQueries.categories.filter(cat => cat !== e.target.value) })
		}

		playSound('pop')
		setNowQueries({ ...nowQueries, [e.target.name]: e.target.value })
	}

	function handleSubmit (e) {
		e.preventDefault()
		cleanQuestions()
		cleanWildCards()

		const query = Object.keys(nowQueries).map(key => `${key}=${nowQueries[key]}`).join('&')
		setQueries(queryValidator(nowQueries))
		router.push({ pathname: '/play', query })

		const cate = nowQueries.categories.map(cat => categoriesJSON.find(c => c.id === cat).name)
		if (router.pathname === '/play') getQuestions(cate, nowQueries.infinitymode ? 5 : nowQueries.questions)

		closeDialog()
	}

	function clickOutsideDialog (e) {
		const rect = dialog.current.getBoundingClientRect()
		if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
			closeDialog()
		}
	}

	function closeDialog () {
		playSound('pop-down')
		dialog.current.classList.add('hide')
		function handleAnimationEnd () {
			dialog.current.classList.remove('hide')
			dialog.current.close()
			dialog.current.removeEventListener('animationend', handleAnimationEnd)
		}
		dialog.current.addEventListener('animationend', handleAnimationEnd)
	}

	return (
		<dialog ref={dialog} onClick={(e) => clickOutsideDialog(e)} id="newGameDialog" className='fixed top-1/2 w-10/12 sm:w-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-teal-400 to-cyan-600 text-white rounded-2xl shadow-2xl py-12 px-10'>
			<button className='absolute top-4 right-4 text-3xl hover:scale-110 transition-transform text-white' onClick={closeDialog}>
				<IoCloseSharp />
			</button>

			<form onSubmit={(e) => e.preventDefault()} >
				<div className='flex flex-col sm:flex-row gap-8 mb-8'>
					<JsxForm handleInputs={handleInputs} nowQueries={nowQueries} />
				</div>

				<button type='submit' className='bg-white text-teal-600 font-bold uppercase py-4 px-8 w-full rounded-xl shadow-lg hover:bg-gray-200 transition-all' onClick={(e) => handleSubmit(e)}>Start New Game</button>
			</form>
		</dialog >
	)
}
