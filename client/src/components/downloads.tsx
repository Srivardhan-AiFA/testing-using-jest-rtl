export default function Downloads() {
  return (
    <div>
      <div className="flex bg-[#31337c] rounded-md p-10">
        <div>
          <div>
            <p className="text-sm text-gray-200">Download Mobile</p>
            <p className="text-md text-gray-200">Apps</p>
            <p className="text-sm text-gray-200 mt-5 pr-20">
              Now, your account is on your fingers
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <div className="bg-[#070707] py-2 px-2 gap-1 max-w-25 max-h-10 flex items-center rounded-sm cursor-pointer">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#4db6ac"
                  d="M7.705,4.043C7.292,4.15,7,4.507,7,5.121c0,1.802,0,18.795,0,18.795S7,42.28,7,43.091c0,0.446,0.197,0.745,0.5,0.856l20.181-20.064L7.705,4.043z"
                ></path>
                <path
                  fill="#dce775"
                  d="M33.237,18.36l-8.307-4.796c0,0-15.245-8.803-16.141-9.32C8.401,4.02,8.019,3.961,7.705,4.043l19.977,19.84L33.237,18.36z"
                ></path>
                <path
                  fill="#d32f2f"
                  d="M8.417,43.802c0.532-0.308,15.284-8.825,24.865-14.357l-5.601-5.562L7.5,43.947C7.748,44.038,8.066,44.004,8.417,43.802z"
                ></path>
                <path
                  fill="#fbc02d"
                  d="M41.398,23.071c-0.796-0.429-8.1-4.676-8.1-4.676l-0.061-0.035l-5.556,5.523l5.601,5.562c4.432-2.559,7.761-4.48,8.059-4.653C42.285,24.248,42.194,23.5,41.398,23.071z"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-200">Download</span>
              <span className="text-sm text-gray-200 font-semibold">
                Google
              </span>
            </div>
          </div>
          <div className="bg-[#070707] p-1 max-w-25 max-h-10 flex items-center rounded-sm cursor-pointer">
            <div>
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/ios/50/mac-os--v1.png"
                alt="mac-os--v1"
              />
            </div>
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-200">Download</span>
              <span className="text-sm text-gray-200 font-semibold">Apple</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
