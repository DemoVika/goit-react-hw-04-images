import css from './button.module.css';

export const Button = ({ loadMoreFn }) => {
  return (
    <button className={css.button} type="button" onClick={() => loadMoreFn()}>
      Load more
    </button>
  );
};
