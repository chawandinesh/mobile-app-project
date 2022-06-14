import PropTypes from 'prop-types';

const Documents = ({ additionalData }) => {
  const length = additionalData.length - 1;
  return (
    <ul className="additional__list">
      {additionalData.map((doc, i) => {
        const { url, description, title } = doc;
        return (
          <li
            key={title.replace(' ', '')}
            className={
              i < length
                ? 'additional__item--bordered additional__spacing'
                : 'additional__spacing '
            }
          >
            <a
              href={url}
              className="link-secondary-alt"
              target="_blank"
              title="This link will open in a new window" rel="noreferrer"
            >
              {description}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Documents.propTypes = {
  additionalData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};

export { Documents };
