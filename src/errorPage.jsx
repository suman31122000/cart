const ErrorPage=()=>{
    setInterval(() => {
       const error = document.getElementById('error')
       error.classList.add('animate-bounce');
    }, 200);
    return(
        <>
        <div className="flex items-center justify-center w-100% h-100% bg-gradient-to-t from-red-800 to-gray-900">
      <div className="flex flex-col items-center justify-center mt-40">
        {/* Antenna */}
        

        {/* TV */}
        <div className="relative w-[40em] h-[19em] bg-red-900 border-2 border-black rounded-[15px] shadow-inner flex items-center justify-center mt-12">
          <div className="relative w-[35em] h-[15em] bg-gray-900 border-2 border-black rounded-[10px]">
            
          <div className="flex items-center justify-center m-12 text-gray-50">
  <span id="error" className="text-4xl font-bold text-center">
    ERROR 404 <br />
    PAGE NOT FOUND
  </span>
</div>
          </div>
        </div>

        {/* TV Stand */}
        <div className="relative flex items-center justify-center mt-6 h-40">
          <div className="w-[20em] h-2 bg-black"></div>
        </div>
      </div>
    </div>
        </>
    )
}
export default ErrorPage;