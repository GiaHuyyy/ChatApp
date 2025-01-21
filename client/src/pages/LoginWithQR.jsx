import Images from "../constants/images";

export default function LoginWithQR() {
  return (
    <div className="w-[236px] mx-auto border border-[#f0f0f0] rounded-[10px] flex flex-col items-center">
      <img src={Images.QR} alt="" width={224} height={224} />
      <p className="text-[#006af5] text-[17.5px]">Chỉ dùng để đăng nhập</p>
      <p className="text-[17.5px]">Zz trên máy tính</p>
    </div>
  );
}
