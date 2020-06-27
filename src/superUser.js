export let isSuperUser = localStorage.getItem('superUser') === 'true';

export const enableSuperUser = () => {
    isSuperUser = true;
    localStorage.setItem('superUser', true);
    window.location.reload();
}

export const disableSuperUser = () => {
    isSuperUser = false;
    localStorage.setItem('superUser', false);
    window.location.reload();
}