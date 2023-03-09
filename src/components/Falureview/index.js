const Falureview = props => {
  const {onclick} = props
  const retry = () => onclick
  return (
    <>
      <img
        src="https://res.cloudinary.com/dbs9akgm5/image/upload/v1678292029/somethinwentwrong_chni05.png"
        alt="error"
      />
      <p>Something went wrong please try again</p>
      <button type="button" onClick={retry()}>
        Try Again
      </button>
    </>
  )
}
export default Falureview
