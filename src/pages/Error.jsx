import { useRouteError } from 'react-router-dom';

export default function Error() {
    const err = useRouteError();
    console.log(err);
    return (
        <div className='alert alert-danger'>
        <h1>An error has occured</h1>
        <p>
        <i>{err.statusText || err.message}</i>
        </p>
    </div>
    )
};