import qs from 'qs'
import axios from 'axios'
import configEnv from '../../../../app/pkg/services/env/env.js'

export const Authorization = () => {
    return encodeURI(`https://linkedin.com/oauth/v2/authorization?client_id=${configEnv.linkedin_client_id}&response_type=code&scope=${configEnv.linkedin_scope}&redirect_uri=${configEnv.linkedin_redirect_uri}`)
}

export const Redirect = async (code) => {
    const payload = { 
        client_id: configEnv.linkedin_client_id,
        client_secret: configEnv.linkedin_client_secret,
        redirect_uri: configEnv.linkedin_redirect_uri,
        grant_type: "authorization_code",
        code
    }

    const access_token = await axios({
        url: `https://linkedin.com/oauth/v2/accessToken?${qs.stringify(payload)}`,
        method: 'POST',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    })
    .then(response => response)
    .catch(error => error)

    //console.log(access_token.data);
    
    if (access_token?.data?.access_token) {
        const data = await axios({
            url: 'https://api.linkedin.com/v2/userinfo', // /userinfo
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token.data.access_token}`
            }
        })
        .then(response => response)
        .catch(error => error)
    
        return {
            data: data.data,
            access_token: access_token.data
        }
    }

    return {
        access_token: access_token.data
    }
}