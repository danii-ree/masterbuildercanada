"use client"
import { useSearchParams } from 'next/navigation';
import React, { useRef, useEffect, JSX} from 'react';
import { Phone, Mail, MapPin, Hammer, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

type Props = {
    title: string,
    onClose: () => void,
    onOk: () => void,
    children: React.ReactNode, 
}

export default function Dialog({title, onClose, onOk, children}:Props){


    const searchParams = useSearchParams()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    const showDialog = searchParams.get('showDialog')


    useEffect(() => {
        if (showDialog == 'y')
        {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
    }, [showDialog])

    const closeModal = () =>{
        dialogRef.current?.close()
        onClose()
    }

    const clickOk = () =>{
        onOk()
        closeModal()
    }

    const dialog: JSX.Element | null = showDialog === 'y'
        ? (
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
                <div className="w-[500px] max-w-fullbg-gray-200 flex flex-col">
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-gray-100">
                        <h1 className="text-xl font-sans font-semibold">{title}</h1>
                        <a href="/" onClick={closeModal} 
                        className="mb-2 py-1 px-[11.4px] text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:text-white"
                        >X</a>
                    </div>
                    <div className="px-5 pb-6">
                        {children}
                        <div className="flex flex-row justify-end mt-2">
                            <a onClick={clickOk} className="bg-teal-500 mt-3 py-2 px-2 text-white rounded border-none"
                            >Submit</a>
                        </div>
                    </div>
                </div>
            </dialog>
        ): null

    return dialog

}