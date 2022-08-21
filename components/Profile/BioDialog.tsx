import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { userUpdateBio } from '../../redux/actions/userActions';
import { toastError } from '../../utils/toast';
import Button from '../Button';
import Dialog from '../Dialog';
import ChatOptionIcon from '../Icons/ChatOptionIcon';
import CupIcon from '../Icons/CupIcon';
import KissFaceIcon from '../Icons/KissFaceIcon';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export default function BioDialog({ isOpen, onClose }: Props) {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');
    const handleClose = () => {
        try {
            onClose();
            dispatch(userUpdateBio({ bio: value }));
        } catch (error) {
            toastError((error as IResponseError).error);
        }
    };
    return (
        <>
            <Dialog title="Giới thiệu bản thân" isOpen={isOpen} onClose={onClose}>
                <textarea
                    className="px-2 py-[10px] rounded-lg bg-neutral-5 w-full resize-none"
                    rows={4}
                    placeholder="Ví dụ: Quan trọng là important"
                    maxLength={200}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
                <Button block title="Lưu" type="secondary" className="mt-auto" onClick={handleClose} />
            </Dialog>
        </>
    );
}
