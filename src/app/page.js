import Link from "next/link";
import Image from "next/image";
import {
	ArrowRight,
	BookTemplate,
	BookTemplateIcon,
	Github,
	Grip,
	Linkedin,
	Share,
	Twitter,
} from "lucide-react";
import { LayoutList } from "lucide-react";

export default function Home() {
	return (
		<div className='relative overflow-hidden'>
			<svg
				className='absolute inset-x-0 top-0 z-0 block h-[64rem] w-full stroke-gray-200/[0.5] [mask-image:linear-gradient(to_bottom,white,transparent)]'
				aria-hidden='true'
			>
				<defs>
					<pattern
						id='1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84'
						width='200'
						height='200'
						x='50%'
						y='-1'
						patternUnits='userSpaceOnUse'
					>
						<path d='M.5 200V.5H200' fill='none'></path>
					</pattern>
				</defs>
				<svg x='50%' y='-1' className='overflow-visible fill-gray-50'>
					<path
						d='M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z'
						stroke-width='0'
					></path>
				</svg>
				<rect
					width='100%'
					height='100%'
					stroke-width='0'
					fill='url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)'
				></rect>
			</svg>
			<div
				className='absolute left-1/2 right-0 top-0 z-10 -ml-24 rotate-90 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48'
				aria-hidden='true'
			>
				<div
					className='from-cyan-500 aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr to-sky-500 opacity-30'
					style={{
						clipPath:
							"polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
					}}
				></div>
			</div>
			<main className=' flex flex-col items-center justify-between max-w-[100rem] mx-auto  md:gap-20'>
				{/* Hero */}
				<div className='px-4 md:px-24 py-6  md:py-10 flex flex-col items-center justify-between w-full'>
					{/* Header/navbar */}
					<nav className='flex justify-between items-center w-full border border-gray-200  rounded-full py-3 px-6 backdrop-filter backdrop-blur-lg bg-opacity-70 sticky top-4'>
						{/* <div>
						<Image
							width={36}
							height={36}
							src='/assets/Icon.png'
							alt='App Logo'
						/>
					</div> */}
						<div className='font-extrabold text-3xl flex items-center justify-center gap-2'>
							<span className='bg-gradient-radial bg-gray-700  bg-clip-text text-transparent'>
								Form{" "}
							</span>
							<Image
								src='/assets/Vibe.png'
								alt='Vibe text'
								width={76}
								height={76}
							/>
						</div>
						<Link href='/signup'>
							<button className='shadow-xl w-36 flex p-3 justify-center rounded-full btn-primary text-white font-medium'>
								Sign Up
							</button>
						</Link>
					</nav>
					{/* Hero Content */}
					<div className='flex flex-col md:flex-row w-full h-auto md:pt-1 0 items-center '>
						<div className='text-left w-full flex flex-col items-center mt-10 md:mt-0 gap-6'>
							{/* <div className='font-extrabold text-5xl flex gap-2'>
							<span className='bg-gradient-radial bg-gray-700  bg-clip-text text-transparent'>
								Form{" "}
							</span>
							<Image
								src='/assets/Vibe.png'
								alt='Vibe text'
								width={106}
								height={106}
							/>
						</div>
						<p className='w-full md:max-w-lg text-base text-center -mt-2'>
							Create Beautiful Forms with Ease
							<br /> Design and Deploy Custom Forms Effortlessly
						</p>
						{/* CTA HERO 
						<div className='flex flex-col sm:flex-row justify-center items-center gap-4  w-full'>
							<Link href='/signup'>
								<button className='shadow-xl w-64 sm:w-44 flex p-3 justify-center rounded-md btn-primary text-white font-medium '>
									Get Started
								</button>
							</Link>
							<Link
								href='https://github.com/yatharth1706/FormVibe'
								target='_blank'
							>
								<button className='flex gap-1 items-center justify-center p-3 bg-white shadow-xl w-64 sm:w-44  rounded-md btn-secondary font-medium'>
									<Github className='w-6 h-4' />
									<span>Star on github</span>
								</button>
							</Link>
						</div> */}
							<div
								className='mx-auto mt-4 grid max-w-7xl grid-cols-1 items-end gap-10 pb-20 pt-20 md:grid-cols-3 md:gap-20'
								style={{ opacity: "1" }}
							>
								<div className='md:col-span-2'>
									<h1 className='text-center md:text-left text-3xl font-medium text-neutral-800 md:text-3xl  lg:text-6xl lg:leading-snug'>
										Create beautiful forms with{" "}
										<span className='font-bold text-[#229FFF]'>
											easy design
										</span>{" "}
										and deploy{" "}
										<span className='font-bold text-black'>
											custom forms effortlessly
										</span>{" "}
										with{" "}
										<span className='font-bold text-[#229FFF]'>Form Vibes</span>
									</h1>
								</div>
								<div className='group relative z-10  w-full h-full flex items-center justify-center md:flex-col gap-3 cursor-pointer  text-center'>
									<Link href='/signup'>
										<button className='relative bg-blue-500 text-white z-10 flex w-full rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-7 py-4 text-base font-extrabold shadow-2xl shadow-white/[0.1] lg:w-fit lg:px-12 lg:py-6 lg:text-2xl '>
											Get Started
											<ArrowRight className='ml-2 h-6 w-6' />
										</button>
									</Link>
									<Link
										href='https://github.com/yatharth1706/FormVibe'
										target='_blank'
									>
										<button className='relative z-10 flex w-full rounded-xl bg-white px-4 py-4 hover:bg-black hover:text-white text-base font-extrabold shadow-2xl shadow-white/[0.1] lg:w-fit lg:px-8 lg:py-6 lg:text-2xl gap-2 border-2 border-black'>
											<span> Star on Github</span>
											<Github className=' hover:text-white w-6 h-6' />
										</button>
									</Link>
									{/* <Link
									className='relative z-10 flex w-full rounded-xl bg-black px-4 py-4 text-base font-extrabold text-white shadow-2xl shadow-white/[0.1] lg:w-fit lg:px-8 lg:py-8 lg:text-3xl'
									tabindex='0'
									style={{ transform: "none" }}
								>
									Book a Demo
								</Link> */}
								</div>
							</div>
							{/* HERO IMAGE */}
							<Image
								className='w-11/12 object-cover z-10 opacity-90 rounded-md mt-10'
								src='/assets/HeroBanner.png'
								alt='Intro Pic'
								width={1378}
								height={721}
								quality={100}
							/>
						</div>
					</div>
				</div>

				<div className='w-full h-auto flex flex-col items-center pt-20 gap-8 sm:gap-20'>
					<div className='w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20'>
						<div className='flex flex-col w-full md:w-4/12 p-6 justify-center gap-5'>
							<div className='flex gap-4 items-center'>
								<Grip />
								<h3 className='text-2xl font-bold'>Drag and Drop</h3>
							</div>
							<p className='text-gray-800'>
								Built in drag and drop functionality provided in the forms
								builder page to let users make form easy with just simple drag
								and drop
							</p>
						</div>
						<div className='flex w-full md:w-8/12'>
							<div className=' w-full mx-auto rounded-xl p-1'>
								<div className='flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto'>
									<img
										src='/assets/DragAndDrop.png'
										className='w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20'>
						<div className='flex flex-col w-full md:w-8/12 gap-10 order-2 md:order-none'>
							<div className=' w-full mx-auto rounded-xl p-1 gap-5'>
								<div className='flex p-4 justify-center w-full rounded-xl rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto'>
									<img
										src='/assets/Airtable.png'
										className='w-full md:w-full rounded-lg shadow-xl -rotate-1'
									/>
								</div>
							</div>
							<div className=' w-full mx-auto rounded-xl p-1 gap-5'>
								<div className='flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto'>
									<img
										src='/assets/Typeform.png'
										className='w-full md:w-full rounded-lg shadow-xl rotate-1'
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col w-full md:w-4/12 justify-center gap-5 p-6 order-1 md:order-none'>
							<div className='flex gap-4 items-center '>
								<LayoutList />
								<h3 className='text-2xl font-bold'>Form Types</h3>
							</div>
							<p className='text-gray-800'>
								Share form with users in different form types. Currently
								Airtable and Typeform is supported. Use any form type to share
								with users and get the responses
							</p>
						</div>
					</div>
					<div className='w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20'>
						<div className='flex flex-col w-full md:w-4/12 p-6 justify-center gap-5'>
							<div className='flex gap-4 items-center'>
								<BookTemplate />
								<h3 className='text-2xl font-bold'>
									Custom Pre-Built Templates
								</h3>
							</div>
							<p className='text-gray-800'>
								Customized templates to create forms and share with users. No
								need to go to builder. User can directly choose pre built custom
								made templates and create form in seconds
							</p>
						</div>
						<div className='flex w-full md:w-8/12'>
							<div className=' w-full mx-auto rounded-xl p-1'>
								<div className='flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto'>
									<img
										src='/assets/Templates.png'
										className='w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1'
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20'>
						<div className='flex w-full md:w-8/12 order-2 md:order-none'>
							<div className=' w-full mx-auto rounded-xl p-1'>
								<div className='flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#6776FF] via-[#87c9f8] to-[#ceeaff] h-auto'>
									<img
										src='/assets/Customize.png'
										className='w-full md:w-11/12 mx-auto rounded-lg shadow-xl rotate-1'
									/>
								</div>
							</div>
						</div>
						<div className='flex flex-col w-full md:w-4/12 p-6 justify-center gap-5 order-1 md:order-none'>
							<div className='flex gap-4 items-center'>
								<BookTemplateIcon />
								<h3 className='text-2xl font-bold'>Form Customizations</h3>
							</div>
							<p className='text-gray-800'>
								Provides full customization for the form including selecting
								form banners or icons. Both are optional and if not provided
								dummy background comes.
							</p>
						</div>
					</div>

					<div className='w-10/12 flex flex-col md:flex-row px-4 md:px-24 py-6 md:py-10 gap-8 md:gap-20'>
						<div className='flex flex-col w-full md:w-4/12 p-6 justify-center gap-5'>
							<div className='flex gap-4 items-center'>
								<Share />
								<h3 className='text-2xl font-bold'>
									Share forms with the users
								</h3>
							</div>
							<p className='text-gray-800'>
								It provides sharable link which we can share with users to get
								their responses. It provides feature to share the form via
								twitter, linkedin or facebook as well
							</p>
						</div>
						<div className='flex w-full md:w-8/12'>
							<div className=' w-full mx-auto rounded-xl p-1'>
								<div className='flex p-4 justify-center w-full rounded-xl -rotate-1 bg-gradient-to-r from-[#ceeaff] via-[#87c9f8] to-[#6776FF] h-auto'>
									<img
										src='/assets/Share.png'
										className='w-full md:w-11/12 mx-auto rounded-lg shadow-xl'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full mt-20 px-4 md:px-24 py-6 md:py-10'>
					<div className='flex flex-col items-center w-full h-auto md:gap-28 gap-10'>
						<h2 className='text-3xl font-semibold'>Tech Stack Used</h2>
						<div className='flex flex-col md:flex-row gap-12 md:gap-24 w-full items-center md:justify-center h-auto flex-wrap'>
							<img
								src='/assets/nextjsIcon.svg'
								className='w-44 h-44 rounded-lg'
							/>
							<img
								src='/assets/appwriteIcon.svg'
								className='w-44 h-44 rounded-lg'
							/>
							<img
								src='/assets/shadcnIcon.png'
								className='w-44 h-44 rounded-full object-cover'
							/>
							<img
								src='/assets/Formik.png'
								className='w-44 h-44 rounded-full object-cover'
							/>
							<img
								src='/assets/Tailwind.png'
								className='w-44 h-44 rounded-full object-cover'
							/>
							<img
								src='/assets/Lucide.png'
								className='w-44 h-44 rounded-full object-cover'
							/>
							<img
								src='/assets/DND.png'
								className='w-44 h-44 rounded-full object-cover'
							/>
						</div>
					</div>
				</div>

				<div className='w-full mt-20 flex flex-col items-center gap-5 bg-slate-100 p-12'>
					<div className='font-extrabold text-2xl flex items-center gap-1'>
						<div>
							<img
								width={44}
								height={44}
								src='/assets/Icon.png'
								alt='App Logo'
							/>
						</div>
						<span className='ml-2 bg-gradient-radial bg-gray-700  bg-clip-text text-transparent'>
							Form{" "}
						</span>
						<img src='/assets/Vibe.png' alt='Vibe text' className='w-16' />
					</div>
					<p className='text-xs text-gray-600'>
						Built with NextJS and Appwrite ❤️
					</p>
					<div className='flex flex-col sm:flex-row gap-8'>
						<Link href='http://github.com/yatharth1706' target='_blank'>
							<span className='flex gap-2 items-center cursor-pointer hover:scale-105'>
								<Github className='w-5 h-5' /> My Github
							</span>
						</Link>
						<Link href='https://twitter.com/yatharth170699' target='_blank'>
							{" "}
							<span className='flex gap-2 items-center cursor-pointer hover:scale-105'>
								<Twitter className='w-5 h-5' /> My Twitter
							</span>
						</Link>
						<Link
							href='https://www.linkedin.com/in/yatharth-verma-938924169/'
							target='_blank'
						>
							<span className='flex gap-2 items-center cursor-pointer hover:scale-105'>
								<Linkedin className='w-5 h-5' /> My Linkedin
							</span>
						</Link>
					</div>
					<div className='flex flex-col'>
						<span>Author: Yatharth Verma</span>
					</div>
				</div>
			</main>
		</div>
	);
}
