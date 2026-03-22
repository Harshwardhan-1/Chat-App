import { useState } from "react";
export  function Dashboard(){
  const [ownImage,setOwnImage]=useState<File>();
  const [clothImage,setClothImage]=useState<File>();




  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!ownImage || !clothImage){
      alert('both images are required');
      return;
    }

  }
    return(
        <>
       <div className="quick-tips">
  <h2>Quick Tips</h2>
  <div className="tips-container">
    <div className="tip-card">
      <h3>1. Upload Your Photo</h3>
      <p>Use a clear front-facing photo for best try-on results.</p>
    </div>
    <div className="tip-card">
      <h3>2. Upload Clothes Image</h3>
      <p>Make sure the clothing image is high-quality and isolated (transparent background if possible).</p>
    </div>
    <div className="tip-card">
      <h3>3. Preview & Adjust</h3>
      <p>Check how the clothing looks on you and make adjustments if necessary.</p>
    </div>
    <div className="tip-card">
      <h3>4. Save & Share</h3>
      <p>Download your look or share with friends for feedback.</p>
    </div>
  </div>
</div>  



<h1>Upload your photo here</h1>
<form onSubmit={handleSubmit} encType="multipart/form-data">
<input type="file" name="ownImage" onChange={(e)=>setOwnImage(e.target.files?.[0])}/>
<input type="file" name="clothImage" onChange={(e)=>setClothImage(e.target.files?.[0])} />
<button type='submit'>Upload Your Image</button>
</form>
        </>
    );
}