const EditCaretPositioning: any = {}

export default EditCaretPositioning;
EditCaretPositioning.getCaret = function (el: any) {
    let caretAt = 0;
    const sel = window.getSelection();
    if (!sel) return;
    if ( sel.rangeCount == 0 ) { return caretAt; }
  
    const range = sel.getRangeAt(0);    
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    caretAt = preRange.toString().length;
  
    return caretAt;   
  };
  
  EditCaretPositioning.setCaret = function (el: any, offset: any) {
    let sel = window.getSelection();
    let range = document.createRange();
    
    range.setStart(el.childNodes[0], offset);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  };
