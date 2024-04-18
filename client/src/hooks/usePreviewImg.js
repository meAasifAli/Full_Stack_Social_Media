import { useState } from "react"

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState("")

    const handleImageChange = (ev) => {
        const file = ev.target.files[0]
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    return { setImgUrl, imgUrl, handleImageChange }
}
export default usePreviewImg