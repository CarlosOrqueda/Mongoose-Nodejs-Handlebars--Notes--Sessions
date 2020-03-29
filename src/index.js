import app from './server';
import colors from 'colors';
import './database';

(async () => {
    try {
        await app.listen(app.get('port'));
        console.log(colors.bgGreen(`Server on port ${app.get('port')}`));
    } catch (e) {
        console.log(colors.bgRed(e));
    }
})();