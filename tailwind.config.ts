import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
        extend: {
            colors: {
                "blue":{
                  50:"rgb(232,232,232)"
                },
                "grey":{
                    50:"#747474",
                }
            }
        }
}
