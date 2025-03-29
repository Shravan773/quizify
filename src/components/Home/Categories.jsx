import categories from '@/assets/categories.json'
import Image from 'next/image'

export default function Categories () {
	return (
		<section className='max-w-6xl bg-gradient-to-br from-blue-500 to-green-400 px-10 py-12 rounded-3xl shadow-2xl text-white'>
			<h2 className='text-4xl mb-8 font-extrabold text-center'>Categories</h2>
			<ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8'>
				{categories.map(category => (
					<li key={category.id} title={category.name} className='rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center bg-white text-slate-900 hover:scale-105 transition-transform' style={{ backgroundColor: category.color }}>
						<Image className='drop-shadow-lg mb-4' src={`/categories-icons/${category.name.toLowerCase()}.svg`} alt={category.name} width={50} height={50} />
						<h3 className='text-xl font-bold'>{category.name}</h3>
					</li>
				))}
			</ul>
		</section>
	)
}
