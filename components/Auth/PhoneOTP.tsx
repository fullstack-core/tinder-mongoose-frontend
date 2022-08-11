import { NextPageWithLayout } from '../../types/global';
import Title from '../Home/Title';
import ArrowLeft from '../Icons/ArrowLeft';
import Key from '../Icons/KeyIcon';

const PhoneOTP: NextPageWithLayout = () => {
    return (
        <>
            <section className="container">
                <Title
                    className="mb-[32px]"
                    content={
                        <button className="p-2">
                            <ArrowLeft />
                        </button>
                    }
                />
                <div className="space-y-6">
                    <div className="w-24 h-24 p-4 rounded-3xl image-container bg-neutral-5">
                        <Key />
                    </div>
                    <div>
                        <h4 className="mb-1">Mã xác thực</h4>
                        <p className="text-caption-1 leading-caption-1 text-neutral-40 mb-6">
                            Vui lòng nhập mã OTP được gửi về số điện thoại của bạn, để hoàn thành đăng nhập.
                        </p>

                        <input
                            type="text"
                            className="rounded h-14 w-full mb-4 px-[10px] text-neutral-20 tracking-widest"
                            placeholder="••••••"
                        />

                        <div className="flex justify-end">
                            <button className="font-normal text-primary-40 text-caption-1 leading-caption-1 underline hover:cursor-pointer">
                                Gửi lại OTP
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PhoneOTP;
