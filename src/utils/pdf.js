import jsPDF from 'jspdf'
import images from '../images'

export default class PDFGenerator {
  constructor(font, type = 'a4') {
    this.font = font
    this.pageWidth = 495 // A4
    this.pageHeight = 842 // A4
    this.lineSpacing = 2
    this.margin = 40
    this.doc = new jsPDF('p', 'px', type) // A4
    this.pos = {
      x: this.margin,
      y: 70,
    }
  }

  #updatePos(dx = 0, dy = 0) {
    this.pos.x += dx
    this.pos.y += dy
  }

  #renderSimpleText(text, { fontSize = 14, color = '#000', bold = false }) {
    if (!text) return null
    this.doc.setFont(this.font, bold ? 'bold' : 'normal')
    this.doc.setTextColor(color)
    this.doc.setFontSize(fontSize)
    // TODO handle new lines when text is very long
    this.doc.text(text, this.pos.x, this.pos.y)
    this.pos.y += fontSize + this.lineSpacing
    this.doc.setTextColor('#000') // reset color
  }

  #renderTitleText(title, sub, fontSize = 14, spacing = 10) {
    this.doc.setFont(this.font, 'bold')
    this.doc.setFontSize(fontSize)
    this.doc.text(title, this.pos.x, this.pos.y)
    const titleWidth = this.doc.getTextWidth(title)
    this.doc.setFont(this.font, 'normal')
    this.doc.text(sub, this.pos.x + titleWidth, this.pos.y)
    this.pos.y += fontSize
    this.#updatePos(0, spacing)
  }

  #renderImage(img, height) {
    const { x, y } = this.pos
    this.doc.addImage(img, 'PNG', x, y, 0, height)
    this.pos.y += height
  }

  #renderLine() {
    // TODO take some options
    const x1 = this.margin
    const x2 = this.pageWidth - 2 * this.margin
    this.doc.line(x1, this.pos.y, x2, this.pos.y)
  }

  generateOrderHeader(order) {
    this.doc.setFont(this.font)
    this.#renderImage(images.logoCustLogin, 45)
    this.#updatePos(0, 275)
    this.#renderSimpleText('Certificates Pack', { fontSize: 38, bold: true })
    this.#updatePos(0, 5)
    this.#renderSimpleText(`Order Number ${order.number}`, {
      fontSize: 24,
      color: '#d3d3d3',
      bold: true,
    })
    this.#renderLine()
    this.#updatePos(0, 50)
    this.#renderTitleText('Part Name: ', order.name)
    this.#renderTitleText('Part Number: ', order.number)
    this.#renderTitleText('Material: ', order.material)
    this.doc.save('testing.pdf')
  }
}
