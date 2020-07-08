  /**
   * 複製時加上版權信息
   */
  var copyright = GLOBAL_CONFIG.copyright
  if (copyright !== undefined) {
    document.body.oncopy = function (event) {
      event.preventDefault()
      let textFont; const copyFont = window.getSelection(0).toString()
      if (copyFont.length > 45) {
        textFont = copyFont + '\n' + '\n' + '\n' +
          copyright.languages.author + '\n' +
          copyright.languages.link + window.location.href + '\n' +
          copyright.languages.source + '\n' +
          copyright.languages.info
      } else {
        textFont = copyFont
      }
      if (event.clipboardData) {
        return event.clipboardData.setData('text', textFont)
      } else {
        // 兼容IE
        return window.clipboardData.setData('text', textFont)
      }
    }
  }