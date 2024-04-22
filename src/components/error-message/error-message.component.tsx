import { useAppSelector } from '../../hooks/hooks';
import { selectError } from '../../store/error/error.selectors';
import './error-message.css';

export default function ErrorMessageComponent(): JSX.Element | null {
  const error = useAppSelector(selectError);
  return (error) ?
    <div className='error-message' data-testid='error-message-text'>{error}</div> :
    null;
}

