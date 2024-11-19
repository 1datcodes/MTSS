

const FontSizeDropdown = ({ editor }) => {
    const onFontSizeChange = (e) => {
        editor?.commands.setFontSize(e.target.value);
    }
}

export default FontSizeDropdown;