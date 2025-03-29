import { ImInfinite } from 'react-icons/im'
import { BiTimeFive } from 'react-icons/bi'
import { TbDeviceGamepad2 } from 'react-icons/tb'

const gameModes = [
	{
		icon: <TbDeviceGamepad2 className='text-3xl' />,
		title: 'Classic',
		description: 'Complete questions without fail to win! You have wildcards that can help you'
	},
	{
		icon: <BiTimeFive className='text-3xl' />,
		title: 'Time',
		description: 'Complete questions within the time limit to win! You can use wildcards'
	},
	{
		icon: <ImInfinite className='text-3xl' />,
		title: 'Infinite',
		description: 'Break your record by completing as many questions as you can! You can use wildcards'
	}
]

export default function GameModes () {
	return (
		<section className='lg:max-w-6xl mx-auto px-10 py-12 flex flex-col justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white rounded-3xl shadow-2xl'>
			<h2 className='text-4xl mb-8 font-extrabold text-center'>Game Modes</h2>
			<nav>
				<ul className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
					{gameModes.map((mode, index) => (
						<li key={index + mode.title} className='bg-white text-slate-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105'>
							<div className='flex justify-center mb-6 text-5xl text-purple-600'>{mode.icon}</div>
							<h3 className='text-2xl font-bold text-center mb-4'>{mode.title}</h3>
							<p className='text-base text-center'>{mode.description}</p>
						</li>
					))}
				</ul>
			</nav>
		</section>
	)
}
