const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;


const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Form Submission', () => {
  let dom, document;

  beforeEach(() => {
    dom = new JSDOM(`
      <form id="contactForm">
        <input type="text" id="name" />
        <input type="email" id="email" />
        <textarea id="message"></textarea>
        <button type="submit">Submit</button>
      </form>
    `);
    document = dom.window.document;
  });

  test('should alert if fields are empty', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Mock alert
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    form.dispatchEvent(new dom.window.Event('submit'));

    expect(alertMock).toHaveBeenCalledWith('Veuillez remplir tous les champs');
  });
});
