"use client";
import { SaraburiButtonHref, SaraburiButtonClickable } from "@/components";
import { useState, useEffect, useRef } from 'react';
import { HiBars3 } from "react-icons/hi2";
import { usePopup } from "@/hooks/usePopup";

export default function Navbar() {
	const [isAtTop, setIsAtTop] = useState(true);
	const { togglePopup } = usePopup(); // Access toggle from the provider
	const mouseEnteredDropdown = useRef(false);
	const lockDropdown = useRef(false);
	const dropdownState = useRef(0);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Controls visibility for animation

	useEffect(() => {
		const handleScroll = () => {
			setIsAtTop(window.scrollY <= 100); // Detect if at the top of the window
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);


	const handleDropdownState = () => {
		switch (dropdownState.current) {
			case 0:
				if (mouseEnteredDropdown.current || lockDropdown.current) {
					dropdownState.current = 2;
				} else {
					dropdownState.current = 0;
				}
				break;
			case 1:
				if (mouseEnteredDropdown.current || lockDropdown.current) {
					dropdownState.current = 1;
				} else {
					dropdownState.current = 2;
				}
				break;
			case 2:
				if (mouseEnteredDropdown.current || lockDropdown.current) {
					dropdownState.current = 1;
				} else {
					dropdownState.current = 0;
				}
				break;
		}
		switch (dropdownState.current) {
			case 0:
				setIsDropdownOpen(false);
				setIsDropdownVisible(false);
				break;
			case 1:
				setIsDropdownOpen(true);
				setIsDropdownVisible(true);
				break;
			case 2:
				setIsDropdownOpen(false);
				setIsDropdownVisible(true);
				break;
		}
	}

	// Handle hover with delay
	const handleMouseEnterSolutions = () => {
		mouseEnteredDropdown.current = true;
		handleDropdownState();
		setTimeout(() => {
			handleDropdownState();
		}, 10);
	};

	const handleMouseLeaveSolutions = () => {
		mouseEnteredDropdown.current = false;
		handleDropdownState();
		setTimeout(() => {
			handleDropdownState();
		}, 300);
	};

	return (
		<>
			<div className={`fixed top-0 z-10 w-screen`}>
				<nav className={`flex flex-col w-full md:px-10 px-6 backdrop-blur-2xl font-[family-name:var(--font-jakarta-sans)] justify-start items-center transition-all duration-500 ease-in-out overflow-hidden ${isAtTop ? "bg-background" : "bg-background/50"} ${isDropdownOpen ? "h-[12rem] border-b border-neutral-300" : "h-14"}`}>
					<div className="flex container mx-auto max-w-screen-xl">
						<a
							href={"/"}
							className="flex w-48 items-center"
						>
							Open Sesame
						</a>
						<div className="flex-1 flex justify-center mt-[0.5rem] items-center">
							<ul className="hidden md:flex gap-x-1">
								<li className="relative" onMouseEnter={handleMouseEnterSolutions} onMouseLeave={handleMouseLeaveSolutions}>
									<SaraburiButtonClickable style={2} onClick={() => { lockDropdown.current = !lockDropdown.current }}>Solutions</SaraburiButtonClickable>
								</li>
								<li>
									<SaraburiButtonHref style={2} href={"/pricing"}>Pricing</SaraburiButtonHref>
								</li>
								<li>
									<SaraburiButtonHref style={2} href={"/contact"}>Company</SaraburiButtonHref>
								</li>
							</ul>
						</div>
						<div className="hidden w-48 justify-end items-center mt-[0.3rem] md:flex">
						</div>
						<button className="flex md:hidden mt-7" onClick={togglePopup}>
							<HiBars3 className="w-7 h-7 -translate-y-1/2" />
						</button>
					</div>

					{/* Solutions dropdown */}
					{isDropdownVisible && (
						<div className="block w-full max-w-screen-xl items-center justify-center" onMouseEnter={handleMouseEnterSolutions} onMouseLeave={handleMouseLeaveSolutions}>
							<hr className="col-span-full my-4 border-t border-neutral-300" />
							<a href={"/solutions/lms"} className="flex mx-auto px-4 py-2 hover:bg-[#00000010] rounded-lg items-center justify-center w-[20rem] m-2 h-10 text-sm font-medium duration-300"
							>
								E-Learning
							</a>
							<a href={"/solutions/ehs"} className="flex mx-auto px-4 py-2 hover:bg-[#00000010] rounded-lg items-center justify-center w-[20rem] m-2 h-10 text-sm font-medium duration-300">
								Auditing
							</a>
							
						</div>
					)}
				</nav>
			</div>
		</>
	);
};