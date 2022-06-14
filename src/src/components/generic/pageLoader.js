const PageLoader = ({ isLoading, isSmall = false }) => {
  const classNames = isSmall ? 'page-loader page-loader__small' : 'page-loader';
  
  return isLoading ? (
    <div className={classNames}>
      <span className="visually-hidden">Loading</span>
    </div>
  ) : null;
};

export { PageLoader };
