"use client";

export default function Footer() {

	return (
		<>
			<footer className={`grid grid-cols-12 mx-auto pb-20 p-6 md:p-8 gap-4 gap-y-10 font-[family-name:var(--font-jakarta-sans)] bg-[#f8f8f8]`}>
				<hr className="col-span-full border-t border-neutral-300" />
				<p className="col-start-1 col-span-full">&copy; Copyright 2025 Open Sesame</p>
			</footer>
		</>
	);
};