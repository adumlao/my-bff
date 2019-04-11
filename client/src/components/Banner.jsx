import React from 'react';
import Dropzone from 'react-dropzone';
import FilesBase64 from 'react-file-base64';
import {
  updateUser } from '../services/user'

export default class Banner extends React.Component {
  constructor(props) {
     super(props)

     this.state = {
       currentUser: null,
       filepath: '',
       uploadedFile: null,
     };
     this.onImageDrop = this.onImageDrop.bind(this)
   }

   getFiles(filepath) {
   this.setState({
     filepath: filepath
   });
 }

  getBase64(item, cb) {
     let reader = new FileReader();
     reader.readAsDataURL(item);
     reader.onload = () => cb(reader.result);
     reader.onerror = function(e) {console.log("error", e)}
   }
   onImageDrop(files) {
     this.getBase64(files[0], (result) => {
       this.setState({
         uploadedFile: result
       })
       this.saveBanner();
     })
   }

   async saveBanner(){
       const id = await localStorage.getItem('id');
       const data = {banner: this.state.uploadedFile};
       await updateUser(id, data);
     }



  render(){
    return (
    <form>

      <div className="banner" style={{backgroundImage: `url(${this.state.uploadedFile ? this.state.uploadedFile : this.props.banner}`}}>
      <Dropzone
        onDrop={acceptedFiles => {
          this.onImageDrop(acceptedFiles);
        }}
        multiple={false}>
        {({getRootProps, getInputProps, isDragActive}) => {
          return (
            <div className="banner-drop" {...getRootProps()} >
            <input {...getInputProps()} />
              { isDragActive ?
                <div className="drop-cross"> + </div> :
                <div className="drop-text"> Drag or Upload Photo </div>
              }
            </div>
            )
          }}
      </Dropzone>
      </div>
    </form>
    )
  }
}
