import { upload } from './upload.js'
import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {/*firebase conf*/}

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()



upload('#file', {
    multi :true,
    types: ['.jpg', '.png'],
    onUpload: (files, preview) => {
        const fillesArr = Array.from(files)
        fillesArr.forEach((file, index) => {
            const ref = storage.ref('images/'+file.size)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                console.log(percentage);
                const block = preview[index].querySelector('.preview__info-progress') 
                if(block) block.textContent = percentage.toString();
            }, error => {
                console.error(error);
            }, () => {console.log("completed");
            })
        })
    }
})