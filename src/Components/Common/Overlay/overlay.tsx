const Overlay = () => {
    return ( 
        <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-screen bg-[rgba(0,0,0,.01)] backdrop-blur-sm flex justify-center items-center z-[999999999]">
            {/* <img src={loadingImg} className='w-[250px] h-[250px]' alt='loading' /> */}
            <p className='w-28 h-28 border-4 border-t-0 border-b-0 border-gray-500 rounded-full animate-spin'></p>
        </div>
    );
}

export default Overlay;