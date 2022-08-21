import Title from '../../components/Home/Title';
import SettingIcon from '../../components/Icons/SettingIcon';
import Image from 'next/image';
import Tag from '../../components/Home/Tag';
import DoubleGroup from '../../components/Home/DoubleGroup';
import SingleGroup from '../../components/Home/SingleGroup';
import ChildrenIcon from '../../components/Icons/profile/ChildrenIcon';
import AncoholIcon from '../../components/Icons/profile/AncoholIcon';
import GenderIcon from '../../components/Icons/profile/GenderIcon';
import ReligionIcon from '../../components/Icons/profile/ReligionIcon';
import EducationIcon from '../../components/Icons/profile/EducationIcon';
import { NextPageWithLayout } from '../../types/global';
import NavbarLayout from '../../components/NavbarLayout';
import { Fragment, useEffect, useState } from 'react';
import WhyDialog from '../../components/Profile/WhyDialog';
import BioDialog from '../../components/Profile/BioDialog';
import HobbyDialog from '../../components/Profile/HobbyDialog';
import { Popover } from '@headlessui/react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectUser, userLogOut } from '../../redux/reducers/userSlice';
import ReligionDialog from '../../components/Profile/ReligionDialog';
import EducationDialog from '../../components/Profile/EducationDialog';
import GenderDialog from '../../components/Profile/GenderDialog';
import BeerDialog from '../../components/Profile/BeerDialog';
import Hobby from '../../components/Home/Hobby';
import { genderGetAllGenders } from '../../redux/actions/genderAction';
import { selectGender } from '../../redux/reducers/genderSlice';
import { toastError } from '../../utils/toast';
import { selectEducation } from '../../redux/reducers/educationSlice';
import { educationGetAllEducations } from '../../redux/actions/educationAction';
import { selectBeer } from '../../redux/reducers/beerSlice';
import { beerGetAllBeers } from '../../redux/actions/beerAction';

const Profile: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    const sUser = useAppSelector(selectUser);
    const sGender = useAppSelector(selectGender);
    const sEducation = useAppSelector(selectEducation);
    const sBeer = useAppSelector(selectBeer);

    const [isOpenWhyDialog, setIsOpenWhyDialog] = useState(false);
    const [isOpenBioDialog, setIsOpenBioDialog] = useState(false);
    const [isOpenHobbyDialog, setIsOpenHobbyDialog] = useState(false);
    const [isOpenReligionDialog, setIsOpenReligionDialog] = useState(false);
    const [isOpenEducationDialog, setIsOpenEducationDialog] = useState(false);
    const [isOpenGenderDialog, setIsOpenGenderDialog] = useState(false);
    const [isOpenBeerDialog, setIsOpenBeerDialog] = useState(false);

    const handleLogOut = () => {
        dispatch(userLogOut());
    };

    const handleOpenHobbyialog = () => {
        setIsOpenHobbyDialog(true);
    };
    const handleCloseHobbyDialog = () => {
        setIsOpenHobbyDialog(false);
    };
    const handleOpenWhyDialog = () => {
        setIsOpenWhyDialog(true);
    };
    const handleCloseWhyDialog = () => {
        setIsOpenWhyDialog(false);
    };
    const handleOpenBioDialog = () => {
        setIsOpenBioDialog(true);
    };
    const handleCloseBioDialog = () => {
        setIsOpenBioDialog(false);
    };

    const handleOpenReligionDialog = () => {
        setIsOpenReligionDialog(true);
    };

    const handleCloseReligionDialog = () => {
        setIsOpenReligionDialog(false);
    };

    const handleOpenEducationDialog = () => {
        setIsOpenEducationDialog(true);
    };

    const handleCloseEducationDialog = () => {
        setIsOpenEducationDialog(false);
    };

    const handleOpenGenderDialog = () => {
        setIsOpenGenderDialog(true);
    };

    const handleCloseGenderDialog = () => {
        setIsOpenGenderDialog(false);
    };

    const handleOpenBeerDialog = () => {
        setIsOpenBeerDialog(true);
    };

    const handleCloseBeerDialog = () => {
        setIsOpenBeerDialog(false);
    };

    useEffect(() => {
        async function handleGetGenders() {
            try {
                await dispatch(genderGetAllGenders()).unwrap();
            } catch (error) {
                toastError((error as IResponseError).error);
            }
        }

        async function handleGetEducations() {
            try {
                await dispatch(educationGetAllEducations()).unwrap();
            } catch (error) {
                toastError((error as IResponseError).error);
            }
        }

        async function handleGetBeers() {
            try {
                await dispatch(beerGetAllBeers()).unwrap();
            } catch (error) {
                toastError((error as IResponseError).error);
            }
        }

        if (sGender.data.length === 0) {
            handleGetGenders();
        }

        if (sEducation.data.length === 0) {
            handleGetEducations();
        }

        if (sBeer.data.length === 0) {
            handleGetBeers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <HobbyDialog isOpen={isOpenHobbyDialog} onClose={handleCloseHobbyDialog} />
            <WhyDialog isOpen={isOpenWhyDialog} onClose={handleCloseWhyDialog} reason={sUser.data?.info.reason} />
            <BioDialog isOpen={isOpenBioDialog} onClose={handleCloseBioDialog} />
            <ReligionDialog
                isOpen={isOpenReligionDialog}
                onClose={handleCloseReligionDialog}
                religion={sUser.data?.info.religion}
            />
            {sEducation.data.length > 0 && (
                <EducationDialog
                    isOpen={isOpenEducationDialog}
                    onClose={handleCloseEducationDialog}
                    educationId={sUser.data?.info.education._id}
                />
            )}

            {sGender.data.length > 0 && (
                <GenderDialog
                    isOpen={isOpenGenderDialog}
                    onClose={handleCloseGenderDialog}
                    genderId={sUser.data?.gender._id}
                />
            )}

            {sBeer.data.length > 0 && (
                <BeerDialog
                    isOpen={isOpenBeerDialog}
                    onClose={handleCloseBeerDialog}
                    beerId={sUser.data?.info.beer._id}
                />
            )}

            <section className="container with-navbar">
                <Title
                    className="mb-2"
                    content={
                        <div className="justify-between flex-center-y">
                            <h2 className="text-neutral-100">Tài khoản</h2>
                            <Popover className="relative">
                                <Popover.Button as={Fragment}>
                                    <button className="p-2">
                                        <SettingIcon />
                                    </button>
                                </Popover.Button>

                                <Popover.Panel className="absolute right-0 z-10 top-full">
                                    <ul className="flex flex-col gap-1 p-2 overflow-y-auto bg-white rounded-md shadow-md max-h-60 min-w-[200px]">
                                        <li>
                                            <button
                                                className="w-full py-1 text-center rounded-md text-primary-50 button-2 bg-slate-100"
                                                onClick={handleLogOut}
                                            >
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </Popover.Panel>
                            </Popover>
                        </div>
                    }
                />
                <div className="gap-4 flex-center-y">
                    <Image
                        className="rounded-xl"
                        src={sUser.data ? sUser.data.avatar : '/assets/images/avatar.png'}
                        alt="avatar"
                        height={40}
                        width={40}
                    />
                    <div>
                        <h3 className="text-neutral-100">
                            {sUser.data?.name.firstName} {sUser.data?.name.lastName},30t
                        </h3>
                        <span className="opacity-50 body-2">
                            {sUser.data?.info.reason ? `”${sUser.data.info.reason}”` : ''}
                        </span>
                    </div>
                </div>

                <div className="my-8">
                    <div className="image-container">
                        <Image className="image" alt="post_image" layout="fill" src={'/assets/images/post.png'} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <DoubleGroup
                        title="Tại sao bạn lại ở đây"
                        desc={sUser.data?.info.reason ? sUser.data.info.reason : 'Vui lòng chọn'}
                        onClick={handleOpenWhyDialog}
                    />
                    <DoubleGroup
                        title="Giới thiệu bản thân"
                        desc={sUser.data?.profile.bio ? sUser.data.profile.bio : 'Hãy thêm giới thiệu về bản thân bạn'}
                        onClick={handleOpenBioDialog}
                    />
                </div>

                <div className="flex flex-col gap-2 my-9">
                    <SingleGroup
                        icon={<AncoholIcon />}
                        title="Rượu bia"
                        desc={sUser.data?.info.beer ? sUser.data.info.beer.name : 'Vui lòng chọn'}
                        onClick={handleOpenBeerDialog}
                    />
                    <SingleGroup
                        icon={<GenderIcon />}
                        title="Giới tính"
                        desc={sUser.data?.gender ? sUser.data.gender.name : 'Vui lòng chọn'}
                        onClick={handleOpenGenderDialog}
                    />
                    <SingleGroup
                        icon={<ReligionIcon />}
                        title="Tôn giáo"
                        desc={sUser.data?.info.religion ? 'Có' : 'Không'}
                        onClick={handleOpenReligionDialog}
                    />
                    <SingleGroup
                        icon={<EducationIcon />}
                        title="Học vấn"
                        desc={sUser.data?.info.education ? sUser.data.info.education.name : 'Không'}
                        onClick={handleOpenEducationDialog}
                    />
                </div>

                <div>
                    <div className="flex justify-between mt-2 mb-4">
                        <h5 className="font-bold text-neutral-100">Sở thích</h5>
                        <button className="body-3 text-main-purple" onClick={handleOpenHobbyialog}>
                            Chỉnh sửa
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sUser.data?.hobbies &&
                            sUser.data.hobbies.map((hobby) => <Hobby key={hobby._id} title={hobby.name} />)}
                    </div>
                </div>
            </section>
        </>
    );
};
Profile.protected = true;
Profile.getLayout = (page) => <NavbarLayout>{page}</NavbarLayout>;
export default Profile;
