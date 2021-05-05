const plainText = document.querySelector('#plain-text');
const karakterGeser = document.querySelector('#karakter')
const dechiper = document.querySelector('.dechiper');
const hasil = document.querySelector('.hasil');
const keyGeser = document.querySelector('#pergeseran');

dechiper.addEventListener('click', function(){
    const plainT = plainText.value;
    const karakterG = karakterGeser.value;

    // const plainT = 'dyvayv9 f6b dr5a a6 b5t6cv9 ayv 0vt9va0 6w ayv b5zcv90v, 69 f6b 1b0a dr5a a6 7b90bv r tr9vv9 z5 ayv ih0a tv5ab9f, sr0zt t647bav9 796x9r44z5x z0 r5 v00v5azr3 02z33 a6 3vr95 - 0av7yv5 yrd2z5x';
    // const karakterG = 'abcdefghijklmnopqrstuvwxyz1234567890';
    
    let karakterBaru = [];
    let deskripsi = [];
    const geser = Math.round(Math.abs(keyGeser.value));
    keyGeser.value = geser;

    for(let i=0; i<karakterG.length; i++)
    {
        if(i + (geser % karakterG.length) >= karakterG.length)
        {
            karakterBaru.push(karakterG[i + (geser % karakterG.length) - karakterG.length]);
        }
        if (i + (geser % karakterG.length) < karakterG.length) {
            karakterBaru.push(karakterG[i + (geser % karakterG.length)]);
        }
        
    }

    for(let i=0; i<plainT.length; i++)
    {
        if(karakterG.includes(plainT[i]))
        {
            for(let j=0; j<karakterBaru.length; j++)
            {
                if(plainT[i] == karakterG[j])
                {
                    deskripsi.push(karakterBaru[j]);
                    break;
                }
            }
        }
        else
        {
            deskripsi.push(plainT[i]);
        }
    }

    pesanDeksripsi = deskripsi.join("");
    hasil.innerHTML = pesanDeksripsi;
    
})

console.log();