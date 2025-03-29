import categories from '@/assets/categories.json'
import PageFooter from '../PageFooter'
import playSound from '@/helpers/playSound'

export default function MainHome () {
	function handleTitleHover (e) {
		e.target.classList.add('jello-vertical')
		e.target.style.color = categories[Math.floor(Math.random() * categories.length)].color
		e.target.addEventListener('animationend', () => e.target.classList.remove('jello-vertical'))
	}

	const handleTitleLeave = (e) => (e.target.style.color = 'white')

	function handlePlay () {
		playSound('pop')
		document.getElementById('newGameDialog')?.showModal()
	}

	return (
		<main className='mainHome max-w-6xl relative  mx-auto w-full min-h-[25rem] flex gap-4 flex-col justify-between items-center px-5 md:px-10 py-20 lg:col-start-2 lg:row-start-1 lg:row-end-3 text-center text-white'>
			<article>
				{/* Remove or comment out the <h1> element */}
				{/* <h1 className='mainHome-title'>
					{'Quizify'.split('').map((letter, index) => (
						<span key={index} className='inline-block transition-transform transform hover:scale-125'>{letter}</span>
					))}
				</h1> */}
				<div className='bg-[#1c233a] absolute w-full lg:w-[41.7vw] h-40 top-16 left-0'></div>
				<p className='text-lg mt-4'>Challenge yourself with endless questions and fun!</p>
			</article>
			<button onClick={handlePlay} className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold uppercase px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mt-8'>
				Start Playing
			</button>
			<PageFooter />
		</main >
	)
}
