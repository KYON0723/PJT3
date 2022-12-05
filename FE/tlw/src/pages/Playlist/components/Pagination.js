import styled from "styled-components";

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const Pagination = ({total, maxNum, page, setPage}) => {
  const maxPage = Math.ceil(total / maxNum)

  return (
    <div>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>Pre</Button>
      {Array(maxPage)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === maxPage}>Next</Button>
    </div>
  )
}

export default Pagination;