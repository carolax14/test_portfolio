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
    global.window = dom.window;
  });

  test('should alert if fields are empty', () => {
    const form = document.getElementById('contactForm');
    
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    form.dispatchEvent(new dom.window.Event('submit'));
    
    expect(alertMock).toHaveBeenCalledWith('Veuillez remplir tous les champs');
    alertMock.mockRestore();
  });

  test('should alert success message if form is filled', () => {
    const form = document.getElementById('contactForm');
    document.getElementById('name').value = 'John Doe';
    document.getElementById('email').value = 'john.doe@example.com';
    document.getElementById('message').value = 'Hello';

    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    form.dispatchEvent(new dom.window.Event('submit'));
    
    expect(alertMock).toHaveBeenCalledWith('Merci John Doe, votre message a été envoyé !');
    alertMock.mockRestore();
  });
});
