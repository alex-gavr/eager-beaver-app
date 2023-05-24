const SimpleLoading = ({}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <h1 style={{ transform: 'translateY(-5rem)' }}>Загрузка...</h1>
    </div>
  );
};

export default SimpleLoading;
