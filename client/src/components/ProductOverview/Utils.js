const isValidURL = (url) => {
  if (!url) return false;

  // Regular expression to validate URL
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

  return !!pattern.test(url);
};

const ErrorMessages = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <p key={index} style={{ color: '#F4493C' }}>{message}</p>
    ))}
  </div>
);

export { isValidURL, ErrorMessages };