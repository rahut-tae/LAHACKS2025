"use client";
import { HiArrowUpRight } from "react-icons/hi2";

export default function Footer() {

	return (
		<>
			<footer className={`grid grid-cols-12 mx-auto max-w-screen-xl pb-20 p-6 md:p-12 gap-4 gap-y-10 font-[family-name:var(--font-jakarta-sans)] bg-background`}>
				<hr className="col-span-full my-4 border-t border-neutral-300" />
				<div className="md:col-span-3 col-span-full">
					<span className="text-neutral-500">Solutions</span>
					<ul className="mt-4 space-y-4">
						<li><a href={"/"}>Overview</a></li>
						<li><a href={"/solutions/elearning"}>E-Learning</a></li>
						<li><a href={"/solutions/auditing"}>Audting</a></li>
						<a href={"/auth"} className="block"><li className="flex items-center gap-1">Login<HiArrowUpRight strokeWidth={1} /></li> </a>
					</ul>
				</div>
				<p className="col-start-1 col-span-full">&copy; Copyright 2025 Open Sesame</p>
			</footer>
		</>
	);
};