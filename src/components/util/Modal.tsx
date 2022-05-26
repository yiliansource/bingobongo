import { AnimatePresence, motion } from "framer-motion";
import { MouseEventHandler } from "react";

import { Button } from "./Button";

interface ModalProps {
    open: boolean;
    title: string;

    primaryBtnText: string;
    secondaryBtnText?: string;

    onPrimaryBtnClick?: MouseEventHandler;
    onSecondaryBtnClick?: MouseEventHandler;
    onBackgroundClick?: MouseEventHandler;
}

export function Modal({
    open,
    title,
    primaryBtnText,
    onPrimaryBtnClick,
    secondaryBtnText,
    onSecondaryBtnClick,
    onBackgroundClick,
    children,
}: React.PropsWithChildren<ModalProps>) {
    return (
        <div className={"flex fixed inset-0 z-40 " + (open ? "" : "pointer-events-none")}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="background"
                        onClick={onBackgroundClick}
                        className="fixed inset-0 modal-bg bg-neutral-900/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0.3 } }}
                        transition={{ duration: 0.4 }}
                    ></motion.div>
                )}

                {open && (
                    <motion.div
                        key="modal"
                        className="modal mx-auto max-w-lg mt-12 mb-auto text-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, transition: { type: "spring", duration: 0.5, delay: 0.3 } }}
                        exit={{ scale: 0, transition: { type: "tween", duration: 0.3 } }}
                    >
                        <div className="modal-paper relative flex flex-col w-full bg-white shadow-lg rounded-md">
                            <div className="modal-header flex px-4 py-3 border-b border-gray-200">
                                <h3 className="text-xl font-bold leading-normal">{title}</h3>
                            </div>
                            <div className="modal-body p-4">{children}</div>
                            <div className="modal-footer flex items-center justify-end px-4 py-3 border-t border-gray-200">
                                {secondaryBtnText && (
                                    <Button variant="outlined" text={secondaryBtnText} onClick={onSecondaryBtnClick} />
                                )}
                                <Button variant="contained" text={primaryBtnText} onClick={onPrimaryBtnClick} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}