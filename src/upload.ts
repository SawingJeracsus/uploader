interface IUplod{
    multi?: boolean,
    types?: string[],
    onUpload(files: File[] | FileList, previewInfos: NodeListOf<Element>): void 
}

export const upload = (selector: string, conf: IUplod) =>  {
    let files: FileList | File[] = []
    const input: HTMLInputElement | null = document.querySelector(selector)
    const preview = document.createElement('div')
    preview.classList.add('preview')

    if(input){
        input.classList.add('disp-none')
        const open = document.createElement('button')

        open.classList.add("btn")
        open.classList.add("card__submit")
        open.textContent = "Open"

        const upload = document.createElement('button')

        upload.classList.add("btn")
        upload.classList.add("card__submit")
        upload.classList.add("active")
        upload.textContent = "Upload"

        upload.addEventListener("click", () => {
            preview.querySelectorAll('.preview__remove').forEach(e => e.remove())
            const previewInfos = preview.querySelectorAll('.preview__info')
            previewInfos.forEach(e => {
                e.classList.add('showing')
                e.innerHTML = `<div class="preview__info-progress></div>`
            })

            conf.onUpload(files, previewInfos)
        })

        input.insertAdjacentElement("afterend", open)
        input.insertAdjacentElement('afterend', preview)
        input.insertAdjacentElement('afterend', upload)

        upload.style.display = 'none'

        preview.addEventListener("click", (e: MouseEvent) => {
            //@ts-ignore
            const name: string = e.target?.dataset?.name
            if(!name){
                return
            }
            const newFilesList = []
            for(let i = 0; i < files.length; i++ ){
                if (files[i].name !== name) {newFilesList.push(files[i])}
            }
            files = newFilesList
            if(!files.length){ upload.style.display = 'none' }else{ upload.style.display = 'block' }
            const block = preview.querySelector('[data-name="'+name+'"]')?.closest('.preview__image')
            
            block?.classList.add('removing')
            setTimeout(() => {
                block?.remove()
            }, 300)
            
        })

        const changeHandler = (e: MouseEvent) => {
            preview.innerHTML = ''
            //@ts-ignore
            files = e?.target?.files

            upload.style.display = 'none'

            if(!files?.length){
                return
            }            
            upload.style.display = "block"    
            for(let i = 0; i < files.length; i++){
                const file: File = files[i]
                if(!file.type.match("image")){ return }

                const reader = new FileReader()
                const showName = file.name.substr(0, 13)
                reader.onload = ev => {
                    preview.insertAdjacentHTML('afterbegin', `
                        <div class = "preview__image">
                            <div data-name="${file.name}" class="preview__remove">&times;</div>    
                            <img src="${ev.target?.result}" alt="${file.name}"/>
                            <div class="preview__info"><span>${showName.length < file.name.length ? showName+"...": file.name}</span>   ${Math.floor(file.size/1048576 * 10 )/10}Mb</div>    
                        </div>
                    `)
                }

                reader.readAsDataURL(file)
            }

        }

        if(conf.multi){
            input.setAttribute('multiple', "")
        }
        if(conf.types){
            input.setAttribute("accept", conf.types.join(","))
        }

        open.addEventListener("click", () => input.click())
        //@ts-ignore
        input.addEventListener('change', e => changeHandler(e) )
    }else{
        throw new Error('File input didn`t founded')
    }
    
}   