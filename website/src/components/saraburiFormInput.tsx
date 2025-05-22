export enum SaraburiFormInputType {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    PASSWORD = 'password',
}

export default function SaraburiFormInput({ 
    formInputType,
    labelName,
    id,
    inputValue,
    inputOnChange,
}: { 
    formInputType: SaraburiFormInputType,
    labelName: string 
    id: string,
    inputValue: string,
    inputOnChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
    switch(formInputType) {
        case SaraburiFormInputType.TEXT:
            return <>
                <label htmlFor={id} className="block font-medium mb-[-.8rem]">{labelName}</label>
                <input
                    type="text"
                    id={id}
                    name={id}
                    value={inputValue}
                    onChange={inputOnChange}
                    className="w-full h-12 p-3 bg-[#f8f8f8] border border-neutral-300 rounded-lg outline-none focus:ring-0 focus:border-gray-500 focus:border-2 transition-border duration-300"
                />
            </>;
        case SaraburiFormInputType.TEXTAREA:
            return <>
                <label htmlFor={id} className="block font-medium mb-[-.8rem]">{labelName}</label>
                <textarea
                    id={id}
                    name={id}
                    value={inputValue}
                    onChange={inputOnChange}
                    className="w-full h-32 p-3 bg-[#f8f8f8] border border-neutral-300 rounded-lg outline-none focus:ring-0 focus:border-gray-500 focus:border-2 transition-border duration-300"
                />
            </>;
        case SaraburiFormInputType.PASSWORD:
            return <>
                <label htmlFor={id} className="block font-medium mb-[-.8rem]">{labelName}</label>
                <input
                    type="password"
                    id={id}
                    name={id}
                    value={inputValue}
                    onChange={inputOnChange}
                    className="w-full h-12 p-3 bg-[#f8f8f8] border border-neutral-300 rounded-lg outline-none focus:ring-0 focus:border-gray-500 focus:border-2 transition-border duration-300"
                />
            </>;
    }
}