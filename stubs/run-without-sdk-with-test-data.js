if (window.cmp !== undefined) {
    console.log("Inject default values");

    // Set App name, version and icon
    window.cmp.setApp(
        "My app name",
        '2.0',
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAIAAACyr5FlAAAAAXNSR0IArs4c6QAAAHhlWElmTU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAADYAAAAAQAAANgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAALSgAwAEAAAAAQAAALQAAAAA21mqqgAAAAlwSFlzAAAhOAAAITgBRZYxYAAAABxpRE9UAAAAAgAAAAAAAABaAAAAKAAAAFoAAABaAAAmngKAtSAAACZqSURBVHgB3J0JcBvZeeeZjDOXZsZjO7X27Nqp9Xq92YrtxN5Kauyyd70z43E2iePYrmxl4nV2PaNzLp2kbkqiRFISJYqkDooixfu+JN4Eb/AECV4gAF7gLUoiKY000ogXDgL7vX7drx8ar4HGQWoS11dwixIxJPqH////fe91IyhoY//3zDNf2PTKq1957Rtf//Z3v/2DH33vJz//q5//5if/8Ls339n+m4+O/f745Y+isw8kVR7PaQkv1karhmNqTTG1owltd5I67yV1LkBdx6VZuK5ZSBYqRbNAKlWzkKqZT+1YgErrmIdKFx7hACoDV/t8plPNZbXPCzWX3T7P1Vx2G6ocqnLb5qDycLXO5bXO5bfN5cNj61wBqrtczRW23i1suVvUMleEHsUqbrlb2DSbXjGUUTmUWqqPz+2ITW88HV92NCpz5+G4/7v98C/+ccvbv/jtf3/rV3/5o5995y9++M3//Gf/7mtff+mVV+Gl29hztc7/tede2PTat/7rD976+7/dGvxeROL+FFVEhS6u9VZi36O0wdUskz13wpE35cifdhTMOAqmHfmTjjz4yrgjb8yRC387upbHVe6ILY+q/GEbqYJhW8GwFapQqKJha9EQX8VDVlI3hqy4bg5Zbw5CWUqoKh204CobtKAyoioXqsJowVVptFQazagM5iqqqg1mXCqDmS+9uUaoWr25Vr+Kq06/ClVvMDfoUTUaLE0Gq9poax5caxmytw072kcdbSOOtiF7i3FNPWCu6/msqv1eUe1ESmF3dELF/uNX//n3e3/807/7k2/+6fMvvLjOJzDQT//ciy996/s//JstwTvjb5yrNyUbl7OnHXmzqHJnHDmTjuxxR9aYA8hANbqGK3t0LXvUBpUDNcIXMIGLSQaHBZCB4HBPBsECDhAZHByEDIIFHBAyCBZw4J4MggUcEDJqDAwyMBY8HMDHAF8NA6u4GgdWcTUNrKLSraoHVpsHVlv05laDpc1o0ww5ukYcXaMOzeBag/ZRXvlQZEzBb//fnu/8+esvvLAp0GcycM/3hWef++5P3n4vMvFcgynNZMuddeTccmRNOjLG7OmmtQyhMkfXSDHIELAAPthkjPCaIZDhWTPckwGIEDgIGf5qhpQMJBtOZLhgAXC4ktGkW1FT1axbwdWiW2npX2nVrXYYrNohR/eIo7V/Jb986ODxq6//6Gd/9OxzgTurfj/Tpi9+6Wf/8uHJst6MCQcwkTnpSOeAACZw8WSwsAA+RM3wSIbgJrJkCIbiaiW8ZiA3sRLNYJDBGQqRDR80QyVYCXgK5ya8oRA43AgG8IEFAzTDPRkAB+JDqDbdqsZg7Rl2dOot6fnaf3zn/Ve++GW/T6x/T/D8ppd//u6uc+rxbGBiypFmsqeZ1qCkWHCy4SoYHBnISpCbsMigo0a+R83wnwyZnAGIuOYMppswySBYwIErGVLNQFh4JoNgAQdtYi239y9rDbbeIceNqtF//t3OF198yb8z7Ot3/+Vf/yaiWp9925Ex6UgVsKDJEN2E0gxAxNVNaDiImziR8a9BM0j8lNUMAQ4SMmTIWJV1E85QnDRDIAOwQNWHqqNvWau39A05cor63njrV76eYZ++7yv//k/ej8vJmHJkTiMsUjm1kNUMigyCRYDdxKU3ITmDxE8PbiJ0JdhQiJv4oRmoN1kPzWCS0eZMBsABpelb7jHYuvWWiLNZX/vaN3w61V5+0397+1cX2mdAMFLHHaljPpPBu0k2y03c9iZeJFCKDLFrJfGT7k3kEyhnKKyWle5NmG5Cw+HZTbjexLucIWiGHBkAB1Rn/4pu2FFRM/HTN37p5an25p//4TPP/Hp3WOq4LQMEA2HBJkOBmwhkUFHDvZvAVIOEUH+6VkYC9Ttn+OkmKITyOUPeTbj4qVwzsGzwcAAfICF6q7Z/dfv7x5555hlvzrmyf/v8Sy/viM0GwUjjBcMTGSZGy7phbsLsTZRrhugmRg+TLpd5hvddq7IEyiRDkjOIm2AskGzg6l3u7F3W9q0ODDnCT2ds2vSysnOu7F+9/KU/Dk6vyb7DCQanGaQx8S2BMnsTJzeR9ibeT7o8dq3eaAYMQ0l7Ik66WF3rhuUMJhmumgFYdFFlGHJcuVrx6qtfUXbmPf2rl770x4fzW1DIACx4MlC/KkmgCtxEmIF6zBlSMrzIGUzN8MVNKM0gWNA5w8VN1iuBMrtWJhlEMGjNoMnQgn70LumHHNdTGgLAB7hJcHotTYaH3oRyE2bXypyOK+9aIXC4rpuQ3oRJBsNN/J50McnwLoF6dBP5rtV9AhXJAE+hNAOwwNXdu4T1wy9/+cNnvrAjNjeHchMPZFBdq3IynNxEOs+wkfiJsPCeDIZmDIrLacx1E+ZymlvN8DwDlZlnyE/H3ZGxQs8z3OQMV80AOIAMXMYhR0REmu/59Fe7wkTNQIbCcBOyaJJBkRGgeYb3ZKAVNbFrZZDxb3GewcwZzpqB3IQmo7tnqadnyWh07NgR6ilWsP7+B2/9Mm3CqrQ3kSVD6Fo95gypZviWMzyQwZxncL2JdJ7BTKAu84x1yBl4UU1YNKGn48pzhhIyAI7e3pW+3pWf/vQXrPMv/7Uvv/aNmLZbZJ5B4ifdmyjQDJ4Mz72J/2Q4r8Ir1wzm/oz1SqD+T7q4ATm2Eomh0F0rMRScQF01A8hAcPQsDegsNaqJr371P8iz4PI378fl5eD2hFo08ZIMxb3JhpAhrxnSnTtsMvxfhfeYQOUnXco1g2ABBx7JADighoyO05HpfxD0By4UsL4AA/KMKTuejjM1g9m1snMGawbqNoF64SbUdNztKrw3OYPpJszehMwz6oXlNJiRe1pRk0+g8mQo7U2oxkQ5GQBHX8+SXmd543/+PYsF5689v+mliGojWlEbg/V3fgme1gwmGczehLnWGigymF0r002YmuGHm2zwDJTrTTy6ibRrZSdQ4iZYMzAZAIdhwFpc0Ot5ff/nv9+NOhQKCzYZ1DyDrRkblEB90QyRDE+Tro1IoPKawXQTZm/iwU16UcKQIwPg6O9eGjY4fvvOB85C4fynTV/88vnmadifwXQTBQl0A3OG8w5hxqRLxk2Uk+HiJuulGcwZqHI3Udib4AQq0QxMBsBh6DdXlQ29/PKrzkRQf3rz/3yQMwuywZhnMN2EqRmeV+E9TseFYZfvu/38XjfxrBlC1JDNGf73JsLOHdKekAE56U08aIYgGBLZACZwARZCLY4Y7P/0v7dROFCHsDH1ZJkO0gaRDQACl6gZ/rvJ0yND1AxP+zPWY62VbA+GA7xDmF5o9W2eoZwMIhgkZxDN6O9e1HE1qLMU5Gie/aNnKSiEw+/8+O2MSTGEMsiQnXRtsJu4zRnu1k2kky521ypdaw3ApEs5GcrdJFBkEDgGuheNfas/fP1NgQjq/9+NSIS941g2CBlwwMuGYjKY23agSXG+DEn2ehNiJXDAWlHzMAMlG8eZ6yawT5gsnbDJkM4zAkAGbAglcBDNoGVDskOY7AOVjLnEFTU/ulbeTbgQClgQMkA8AA6TwX78yGUKCu7wuRdejKo3wVUFdG8iuglFBrNrVT4DFfZ0+TbPEMlgJFBPK2o0Gex5hpSMdUig7lbUnHYIy5Ih07WKY1AqZ7h1E0gbvKFgMgCOwf7VypuGFyQX0n3rL16HK5Ho602YZDATqHIyyFa/DbtGTdzTReUMNhneuwm5DEnp9Sby6yYb7iYMMgAOPQzEuhf//Lt/5SQef7N5H3gKcRORjA1IoPJ7x5mTLoZmyPQmXiRQKRkB0AxiJR4TqHIyAtK1QnuCEyh+BCZI6bWLYwb773+3ywmOnfHFcPUihkMkg3KTp6YZzvMM5TNQ5ZoB2/7ISINco0am43BABuTr0bUGbNKl1E2kOUMkA5RDu2gaWIs7lyvC8ewLL8IVz3Bdqxg/IYc+VTKUr5son44Hyk283rkjPwNVrhkB701IzsBwABa4hvtWq24Ynn9euH7/tf/0p9eNKxljDlEzZN0kcKvw6zbpEt2E6k3YZEg1Y0N7E6ZmkDGX2Jv0Oe0QJmutAUmgEjIM2kVj91Jf+8Nv/sf/wovH99/8BdwlQSTjqWoGlTPE3kS5m4hkUAmU3bWuQ85gdq1+Tsf91QyZrlV0E0EzgAxco/3WN/7H3/Fw/O2WYLh5Bg8HRQaza/U8Hfd/f4avVxUwyWBrxjqQoTyBtvcHZh8o3u0nGY0zZ6CuXaurZhA4Jgz29/5lNw8H3HOHh4MiY+MTqJ85g7nbj60ZHt3E47qJy84dJhnMSZdSN5GZdHnhJt5rBrIV7eKE3n7isDAK25+qgnvuBCCBCmNQYZ6xLlciMWegzN6ETcY6aIZyN+E1w3l/BiNnSMkQryrgt4/735u4uAkmA+AY01mTLpUi5YDbkEWW6+BuTGAiuDZeM9YjZxA3IReooZbVo2Z4f88dpma4yxlek+Hdzh16Rc0rNwEscI32rZbkdKL70734yqtwB7fscQYcG37PHTGBMiddTM1g5gxlmuHSm3jvJlLNkJ+Of85zBiFjUPtkpGelqcL0CuztgLs+wr394A5udPwE8cA33KG3+sGYnCyqretuP1/IoLpWJhku+zMCMANlksHUDGbO8GVPl1I3kZmOc2MuPM8g8ZO4CfABZAx2PRnuXtI23n3tq18PgvuB4rs+fk7chEkGc9LlQ84gA1D60kU0A/XoJi4JVEoGN+lSTgYjZ1DzDG6YsRFuQgSDkIHg0C4OtD/89rf+LAjuFCt318eN6lpFN1mXeYY0Z3jWDOmKmsueLmnOkHcTfgbqdc7YiARKkfEEawaQMcTBAXx8/3uvB33vJ2/DnWKJbAQyZ3Arap72Z4g7d5ia4W/OkJLhkjMCpBkyXSs/zyD7/GgrEWeg3P0zyLCLzEDJda3rNM8gcNBkABxQpt6VH7/+VhDcXRruIYzhEMlYz+tNlPcm/pLhf9fqohnK3cRXzfDdTdystXrMGaAZWDYwHON95rff+IegH//yd3B3aS6BCrv9/CcjEOsmTDKYOYN0rRBFxcaVRQYdNQKVM2Q0Q9nOHek8w3cyfOtaiWbQZAx3PZnst/7yf70T9OY/bYP7jgdcM5S7ifKcwSSD2ZuQJXg4ICHUaRV+fd2EI8M5Z9CG4sPecbd7uuRX4eUnXXQCxWqBH4EMqCmd7Z1fvxf06w9D4Y70uHHdiD1dCtZNmJoRyHnGBpDhfFUBozdZZ82ADV1kFZ7VtYoJVKIZGI7JfstHWw4FwadYwGcVrPc8g1o38dCbKCeD6SYumrHBCfRz4SZMMkj8NMIwg5tn0FiAbGAs4HGk68lEr/lYyIWgj2Ny4FMsSNdKxlz0rZjQ3nHpuokXO4SpBOpzb+LbVQVOXSvZ0OXuimdlCfTfZM6g4RjvWYk+lRoEn3wDH25CDIXA4d0MVFECDZhmMHOGyww0AJohnWfI7+nydQYa4HkGUzOoGaioGbRs0FiAbIx0PhnrXk6KuRkEn4mUa+LhYJPxlDVD2f0zpL3JepHh1wxUmjMCTAZs0XCbM/jpOGDBJAMbCpCB4NAu5V6rC4oo7oLPRNqwdRNmb8LMGU+3N5FqhvwMlKkZn78E6gUZoxwcN9JagqKrB+HTstia4ceeLiqB+pIzmGQEKoFKp+PK1k2YOeNzuEOY1ZtwZLiEUFc3Ac0AMqBMXYs1BX1B8PF68DlqGA73OUP5XR8pMsScoXw6vq5k+LZ3/F+dm1C9iagZrvMMzAfOGYQMDEd90UBQrACHezI27Bo1P+YZTr0Jc61VRjPk70gvf43axrsJczrOTKDKyUBYcAnUiQywla4ndUW6oGvtd0E2nMhwSaDKNYPZta5LzgjMitoK/SkW0pwh35v46iZPLYEyNUOODFPnZ1AdleNB8HmtTmT4kTMoMkQ3UU4GUzMClTNYbuJEBnNFjZkzmJqxntNx9s4dT72J0q5VohmYDHjsrpkGOBYIHC53SfB30qWcDGbOYM4zfJiByriJeG8/pmYENGc8tRU15ZqBoganGfA4JoFjI8jw/y4JrHmG+7VWj2T4qRkKutan5iYe5xm4N8GPNBkIDpWgHK5kKM8ZzN6EoRkeyWBdoyYuwVMhY73XWtdDM8TrTRTc24+7T5cfa61c16pcM0zOmgFkjGk4OOCj4RWSwVyFZ5KhvGtl5gziJm7J8G0G6pQz/HQTBTnjqWkGkwx6Bko0g0kGwNEDynFdw8MhXInkRc5gksHQDHf3z/BtRc03Mpw+r9VPMhS4iTRn4OsWfb560VPXKiZQJhnuexOcM5BmdH42rkElwuEDGVRvIs5AmWQEejoeADLWP2dIydj4faCAiJsZKBc/nRIodhNMBg9HsmZh48lw7yZgK8RQfOhNWF1rIDXjc+Im1KRL1AxmAlWqGZxgMOFguwkzZzA1w8+c4X6eQbb60Y0JcwbqGxnMeQaZdAENpHxwk3XWjHUhY0LzWS9kDk45fCPDw6SLeSUSUzPckyH0Jk/fTZiaEaD7dPnRm3BL8H5qBiRQohlAhhMcpHFV/DlqIhl+agbpTdbbTZg5Q6ZrDcz9M3rWt2v1oBnKexOCBRxgMng4UjQLCslg9ib+k6EyWlRGa82gtXbQxpfRWmuw1EAp3jvucdK18b2Jcjdhrqgxp+PKc4Y8GXwIxY0JLRg0GZPYVggc7jWDIkPsTZhkKHATi2rQVjNsrxlaA7Uo7/vsRuf9wta7+c2z+epbBc2zxW3zZdqH1f3L9UZbw9Ba/aCtzmAmFxa4Xm9CyFAbLC2Da61GKBtUG1XtRhuuDqOtw8CXxmDD1WmwtetW4U7CrusmXQPmbr2VFHzuN6oBay9VfQMWXP0DFr50Fvj4NNy19vUuw6dlQcFn3pAy9Fu4Mhv7xRrsN+Ma6jPjGu4zkxrpM4/0rg51LwMiHncIM9daJTNQN2QAHH2QOVI086AcPpChvGslOaMKFGLYXqlfzWuZjS/sjLh64+CZpF3HYj44eGZbSPjWfWFb9oVtDT65fX/ER4ejgk9ePhGTHZdRn10zWtX7uHHQ1mC0upJBEqjaYM2vMcUkV8el1pC6mFrDqJSaS6lCwXFKTXx6fb3mQbtO6iaa/tWs4u5LydVXUmokFQ/fJZYqPgXVVfyYrIq/Xl3feKu3dxkQaWldSEiuSUhWuda1ZBWzEpNVidedKim5JiuzubxkoKPpzpB2cbRnBR6V5wyucUVrreI8gwoZEs0AMhAc1dNBqZp5H8hgagZznoHJqBq0qIbtN7UPL+W1HjiduC341Hu7jr6/98SBg2cjj1+6FJGUfDY983xWdnR2+rmsxDOpF04lHDt6YWdw+OZdoZv3HN9zPPb89cri5tlGg7XRYAEgSBHZaB1cu5zZ+N7Hh7ftOb51zzG+dh/bShf5On3A/YPohJKmzoca3Srcehz3Jhr4iMbuz0JOXNy866j4hPQ3yh4fh//omdhcdfMcSIWqdmL73hNb6Z8KHXtXW/Yce3d36Lt7jn1w4HR4VGpxQZe+41MTIIIvfZaMNLh9oO5noMycgbFAjx08HAtuPuOZchMxgXqrGdXDa2X9S3HZ6p1Hz7+76+je/ZFXI5ObrlaMZ7Y/KNQtlwxZykZt5WP2ijF75bi9YnytYtxSPrZYMnynoK8ntTH7Qu6RI9EIpv0RZxNKytoX1GA3HB+EjKaBVXCT+Cz1lt2hVVfLTXndwzldqHLp0g7nkoKvo2NTfo8qoXL7vrBdh8/llPQ3ax+RrrVLZ66sn94WfPLS6WQT/OOcTqghUtmaIbqyOoa4MmV3pp3L2rr3xJ4j54pu9nd2PgI44M0QH5k8mtk+mN4ymN5qTG8xpjWLlao2ompCldLIV3KDMbnBgKrecL1+IKlWc7Wi5EJedNiVD4NPASih4QnVpYaR7qUR7SIedvk2zyAJlCZjCsExFZTaMY/hICMNGGPgUk4GM2fgVXjViD1bPX0g8hpgcejQucqLN+Zyu62lw2vlJmvZqLlsxFw2uooORs3lJlQVY7gslePWqgl79ZSjeupxyXDb9brwE5fgSXYfjU692duoNzfpzRgOIKNJx8OxeXeoIavD0TDvqLuDql5Sd4WvwAFXDXMPykb2HYp6P/hU8LHYi9ermjoftPcuASKQM1Lz2uG/2JJc72iYc9TdRlV72147K9Qtew2uGXvNjF2FylE7W3GlZMveEx/tjzwQdinuasnNUgMQlnMh11E1tVY5bqsYQ1Vu4mrUBm+MshEoeE2sJVDwIajc56DeHLTeMEJZig2WYr2lSG9FNbCS3zee0pR6OmXHvrDtwSeTr6uMmkej2iX5BOqdm4BmABlTHY9FOFzJ4Cddzp/xrNxNeDKG166XD3x48DToavb57Pv5vWtlI5bS4VW+RlbLoAALXBQcleNmVBOWKqhJKyCimlkqN1XFl38cErFt74nYFFVd32KT3oLJ4OCwXc1SAxy6rHYgwFo761R1s9a62+yqnb0QkbRtXxi83PuOxaYXdKrUt9u6n2gHzKfj8j7Yd3KmaMAO31tzi6sZaw1fFtU0X9VTFr4m4ecsu3wT4PggJBwE6WDY5WspNQBHVnSOvXKCewOgdwL81uh3L4XiXo2SodWSoZWbg6huGFduGFAVQ+mXiwZQgcSi6l8u6DcX9pvz+/uuVR86fO69PcfiLhX1t943aZdg247czh2PvQkvGzwZCI5+UI60jnlXMijNEHsTb90EQgaQAXTv3h/ZmaiylQwjLOBVkJAh1QyMBUcGgmMSVTXUlLV62lFzC7T98JHozWDqV4qrux6oQULQ9vEV6E0oOO4iMpyBsNXddqr6O7Y6VI7G+dL4Mnw6PwiJOBKZmJLb1th+v7Xr0d5jMWHHL65UT9lqb3Oo3bLWOiOimhH4mMZ8wE9I4AA+dh46eyT8KmRtHg7QRU4geTgIHyXcK1PCwUH4QHC48FGA+Fgu6LMU9M+kNkMyg0x2PiZH23hntGtRYc4gVgIHEjfBsiGFw72bEM0og49CwuX2E/YgZ4CbgGYAGYaUxjWMBXp/YNkQNENKxhgnGOMWQTMIGfxbUzUNun2rsP/w0Qtb9hwPj8srb51T69AOYQoOsJU5LBIiDYCCTAEcxtyuHcGn4Fy+HxL+8YHT564UqZpmy2rGgZiMmDwwIPRsohRhPihKKEQ4OJCtwLPh2nnwDMABycleNYkcE7snPEr0g+cD6weIB6cfHByCfojiAXAs5feaC/rHkhv2HjgDshcVndVROzWi+UxYUXOeZwhrrTiHEjgIGRwTvKEAGdO0cigkAxBRQgb0JmW6RcgZ4CYa0AwQT042BTKGpW4i5AwWGYJiCxpuBV+vuz2aq9114DTo9qnYnFL1bFP/sgQOpApSGu7a6p2rAf1xrWHuUeX4wSPRmA84oyeiUkuqRxMzGt/dFapJUxPUZBDhXEbgA9gtvewEx8cSOEQ+BHNB+iGay6poLiIfTuaCxSMf8QH6URNbBPBBZjp3IbtNNTmieUy2aPjgJoAFLh3YSnrHPCGDyhmimxDNUEgGfCASGAr0JhDlcs5nQ7xaLRnk4cAvAc4ZRDNICOVyhrNmOJEBWAh+fwvCZtXVCmgKPgg+FXExH/ho1VuuZnOZI1sDYiCQwdEAEDBqztbAF/Bx+WwavMRIPIJPHQi7nFnYFXYu7eOQ8Lslg3b4Z8iDqMjCUJEZ+PHAYgCOsiulbOWonkL043cCrx8CH4zwgcUD86EXxEMIH5yzLHF8PMruOhUaC7Hmw5DwS5eKNLXTI5pHPBbcni6PXSuxEqwZbDhITIZ4gcsHMqrgDhzah9C1Qly6l9dj5jXDJWqgEMon0LWqSXvVlBWspHJijcuetmrewpGbcJpBkwHGb6udXaycgEAAivrh/ojz10qrO+7FZzahQIrgWEAiIQIhcoCAaOT+CI9COdT3VInV+IwCHHuOno+9Vr7zcFRk2BVL7SynN4IOEURoPqggAu1MqQc4ZPmA9o1vXkpHcOdiRvmDTx4rOJkWEXPpWxbEQxVbiMVj96GotOSansY7Js1jxIenSZfQm6AESpMx0/HYSTlcyWAmUGbXSmaglbDTc9h+Ob8NZKPiYrFNLmoIZNgqx5dKh7UpjZkXcuIiky6EX0s4m1oZX3YHGgR4I8qQge3f0XC3NrEaxANO5+4j5xJz22KTq7fsPqbL0TiaFjgyBCZ4COZtoCiscjTdMxX2k5QARhB6Ogle7ryLxfxTIT8S+IBWiIkIameQ5ckpB/Tk2DfNFRwf5Th/4OYFdS6mrA59WrMhVa1PbRpIaRxMUy/kdVt4PiTiwcdScJaVgr6pFPWu/ZEQmOClOHoyvqxAa2y5D3D4phlAhggH1ZuIky4vNUPc7VdpWIWh+J79kXdztO5lA8i4ldcTdTIeTgO8a+ERZAAeN8ME6eCZpqSaNU6oJZrBB8O62bX6O3M3B+FfwisCFXo2OTwmByaPupxOONm8ZSAseCDWGuepWlhrFMvetLBYM3M0NHZH8ElA5KMDkbsOR8EP0wNdMXoqToT4vMIhgtocwWV4CeFTqjwceQ6QQ+hmcZfubC4QTldKh2GQA78+RB9c8EsFHzqrunTTLNu2IPGAepzTFRYasx1eh5BT8MODubRXj5s6HhM4XBMorRkkZ8ABJgMeB6qmgjI65gXNEMlgaobMdJy7RYLRDJoB2zJgRS2v9fa2kFNXIpIsKG3gcu5QONmwVIw9KDacOBZH2zN578KrAz1wZ2ojWDjJGaiNxGeC61FRJ1I7ey78GpxF+Madh6JCwi7BMYJDfY+zDISFAMTCWpO7cqjvJ51Hk038M8C7cO+hs/fKTcCNEE14RNaIirjyUYvCkIxy5DnAH6sADpoPzliRvSI4Ik5cht+avAhwgF+HgeQGK+hHsX6liB57EPHoW8nvvXgqYes+9L2A1JGTV27makA85HoTgQxkJRI34eFoJ3A436fLS81wun8GeMrVYi2MuuuvlIlNCs6hkLlwFOXggIlQcVwRiAT9WtDH2/edPBoa87h81IanT4QM4IM7K7b62xA8c+MKBbwiwA7gu3S5AMd9HoumeZoJa+O8BXBpuudUavRHR8uDppQG4anCAbJzEYlcQAHCBHtqgNbm7mrtrAW4xC7jwgfM3+ThmEEzPSc4xM52uQTguCSBA16QzfvCcqNzbDAiY888oGfpMxf0JUUmg+pgOHYfOpt4tay7dgbg8EEzbrU/hhKUQ4iftGDQvYnHnAGagat2eO30tdIde46PprfAPJhqUgQyuCYFZOPRDeORoxfgnUEDIRzDF9HX4bfVpjeDUKPRJIGDyAaMxhvn65NqyRmFb+Hg6AI4kGA4ScU9u/reo5oZ0w29o+WTNQDCuRzNn8yUDH60PwL/DPCcN+JL4YvwPLwxca2NvXHekKddgURMIgjPBz+QRXDEs7oVmJeAS6KZniAefPJA4mEpN62UIFtxhQNWqlOj0m03ZeEAW4GBR/LpFAwH/PyQ0M+ez2gsGxzreIThIPMMQTMYCRRrBiZDgKN9Hjcm3pMh5gxMBtrKZbQcjkoJPnAGJuVmYarDNfECHJxsQNoYymwDAcRngn6EXwz8ft/xWJhOwhkqvFQMMyiwD3qcBWkDtB3exBAItJmt2FbwkwAcA7ldjub7FBkiB0v1dxrTmuxwyoEe57Kr76/U3w0TTg88jz5Pi+AAwng+UHezUne7IaUepRDRXIR8ylke/LTewSGMPThbcYLjw5AIeDU27zuRF52LlAO1LSxn4eBIjLxO4ICX4nh4QnmBdqTtwaTmiXIyZjjNEJUjs4OHwx83ATgwGRX9i3tOxEHbvVisF9IoI3DArLDpWjX9y+BTC8PmQ5HXohJKrmSp49JqYTEzMSpjqXLiccXY44rxx5VQE59BVUFNQi2rZrrSW+BEErwEOLiTipRDJAPR0PxJUUL5k/rbiA+nQqw4Wh5mxBUAkaBnIYfPfwpNNXIcLqlwfED+mC0dKr9WhVIqgUMcgSDx4OAgw3g0JOUnpKAcNbxyMJ0FPFeSOYCMHSEoaxtSmywEDqfVFjRHh1rJ6409eRVGHfh1gFh66MTFwsyWweZ7BA7XGSjOoSSBEs2Ag1lsK5mccjDJUO4mQAYHh7VE+/DDw1ExJxOgQac8BY9E0QIsnm04qiZLL92g7QB+q48OnD56Njkhr+1G00x116dFDVNIRfZHHjkaAwbEPcIBV6ExR7iCULL/8HlCBhxwcAjveJEMTiea7zvaPi2ILzXdNDhaHwIfpDAojtZPNdntW/eijinubCpoCRdNeDhAP0CQWtObq5NUKNPIiIciOERn4ZaguXkPrLa4dishh6LqrpRx0w7mNAxlUmhlP83ugkUW6FZ4OIJP7Q+NyUltMDTNT2HloFbU5BIogQPIgNJDtwJwMMmQ6U04KxF6E+ImGA7YB1rcsbDjQGRCZDIsPTvBgdKouPQKylEsBkl+DWLf8biL6XVlrXONupVmg6VK88mhiAToLWFGDm9lNyULB58qeDKAAEfbo/Kk6qrrNY72x/aWB3wJlEAmna+a2HXwDCxlVQIBrQ9FODhzASZSYvKAD1/huMVlDpfYUYF7ltGJnE5jBtntoR5Jb/2koA9eyZWbeFrKXoczF+rGkhshLUGHReAICb2QlVJnaJpDcAir8HK9CcECa4YIRxYFh5J1E5iO465VQgbwUTtoLWy7Cxv+ks+kwRqsExzOI3NQDgkcIBKhUSmZ5Qa0EM/tz1APmEvUs9GJZYcirtGn3/0xpRzEUMBNUIFOABwtmS2xZ1NBQkQ4MCUcIjb1/dPh16ChHS0eAFY4OHhnAU9Zrbtz7PhFfX638/ADTz64sYcHW5GBgx+lww4P2Ooh7POANg22NyAyYKnWHRzWQl3phTzIreSVAScKCY3JTqnHcAiGwi+auHcTTAavHBgOhWutbsiAa9Q8wyEMRl3gOAVdaOTlwuLGaVh855bg0Sp88wBabk3IaYHBDqQz8su7OZCHA5kIMDFQ0LvvcNRn0Aa3Ah8PRUQ4OICevCslsPfnSd1tZCsoc/BwgFpMlxg/3h85Ca6EJ7BU7BBmpu4zhwsceKlFgINbp2Vu8pCFY6VQ9yC78+iRaOIp3Itz6sCxuLz0pkH1wrTmiUQw6EkXUzNutz+GMlRN/X8AAAD//wwgMEgAACVrSURBVOWdeXBb15XmmXHith177JlUpVPV6Z5JTXeq4q7MzB9x0t3pdDtxZ2qStN3pmi4nqalMEse2vGolJWojJXGRuEgiKVESJZLiIpHivoGruIAEAXDfQHBftFjiInHf9/nuu+9dPAAXwCMWmq5WnYKfSQAE8X74znfOue/S65Z2NM+4mk+jc7VAFqrOVRqFnauFnSskDCtFUhQbVliUGFYQZca1zNqRPYeDbpy7uZbbvZzbRSKvm0R+z3J+7wqioA+xVTSUFZnx7sFTH/kEChGw91ho+PWCfM3jqrZlIZbUbUsldU8LtaPJ+W0h0Vm+gVc/OXJWuHPQRz4I+kB6HPTRYfGLew6daU9t2Kp+ulE1vqGm8WSjmsRm9dMtzdRAbuf7h850ZrZu1U5v1kyYovopvUN9ij4qJGGrZkJ8OJ6nagyxVT1RHl/+gXfAo/zurcqx9YrHJMofiXH3szUSD7fKH+dfyZf9aoF7fc+9d+j07Yt3tkrvrxYNCTG4UogYWFEh+ldU5D1ZKejFW0TeqDyE8KYJb+BSjnEpp3MpG2FYykJ0LGa2k8hoQ6xltOeev4Pnl94Q+rYEnjgTnXNb21Pz5J5+dlg3g7gnxX3djBjamQdSPNTO0PhMO0PDUDTsBTjcQgaBo3MtR//kI9+zl4NurOYIZFjBQRAR4MiOyjK9g94B+46HX4wrVtWOVbUDDkJGTcdKUFQaOeu+Zz88ErzHJxBvgXXgTH/kE7DvWNixoGuH/C6+f+g0Bw415QNwTD4s6MV9sq4VbGlnLMggcNRMjBQN6G7VbtVMEjgkMggc6idXwpI+Phw0rurfrByV4BD4uPto3RU4Cvqdg2Mts6Pjetnew8Ef+gTI4cCLDDwbW5rZMlA7eU9H4FBIBviQ4Jg2FA553aZwyAQD4rFdzQAZpR0rZYbVgsaZT0+cDz11GaSLygEJIZ8DKEePoBwEjs2ioWJ8vA5JyuEdsP94eER8iUo7pm5fBhkUjtMXbn146PSls3ExoUkkwsS4HpZM40b4rfDAmA+9Az71PXcprjg0OvPdA/4SHPi4y8RD4AOnfKRwAO/j2cCYDUgFlEMQDHpLBWZd/WQNUkFVR4Jjs2p8rvT+kePnDxwNeVo4IMJRLimHSMZna2XbVQ7IBiXDSjmo9BLZMAqyYakcIKMnruLw0dA93mZk4LeDVkVEpOlUfUO6aYYFDphmMMHAAdMMORmPakU4RvLdQQbgQJS0LfkEXjlxLHwmo21FnlYEOATZEOGoj68QPvSCDEpwFAKONgmO9hW/sARv33MzUJryR1t3SWyWP4Zub1UgRkion7Sn1EEJ8Fk5dyk94ELye2ZwSOeYnOknCAjDWPHQ3iNnEaNFg2AFWIASIcgdpBCoksigstGV3owf5H0sdKJokMBByLCA46EDOErkaWVASCt24BCk1wqO5ayO1SzDcka79orK2zfkfW8Ip5hK2MFhv4jkuLKOikeQDQYHI+O+lErkZEiCAeWYBhmITkE5RlzxGVQzKBllHSvlneunIlL2egd8llK3CsEw8UGUg9mO9cKBh2lN+46c/ZD+YlZwVLcvVzTNHPCLOOMftVw8vF5G3ncSwmcUGk4z/VbVmD6xWsq4QUBE8Bz1gucgRoGE6DwIH/AN40WD+33PvXvQn+SO2imJBnMszBPKRuUonjD3muqdA/7ex8IEOEZkZDyir4q+QsFz5JkypvA5xisknkOEY3DVzHBIypHfu67q30AU9JHI70Ws5/WQyO1ez+1az+lay+6cS28xxJZfCboB94NgQLCDT48Enw25WZbV2q+ZYHBslwwOHLJsIthPRw5UTgZJKx0rlV0bEYl3391/sjm2HL+VLTiEFNt3ITCGnlfkBXiOiLjiwtrR6rbl6rYlnXEzKaflD/tPpkSkbwGI0gdrZQg5H8QJwhiWxBTLz4QIBzSgclSEgyAiuAf1OM4xheOPB/zjI9IEYwEsqK4IaiFiIZpQ8gx4HuhE5WhY0I33Dp4icJC0IoeDWlGSUxAQOZuGVILD3I2aDEdbYrU2tkx3o1R7vUSIYm1McW1MkfZakeaqqjgqOzEk8YxfJDiQPg+WmoFv+fpHJsWWtN594LRmWCoHwwIHCmsTazLKOpYrjOvJRV3v7PdLv3BnwwwOWrBQ20HM+UbhYGuCeo/3GWKmvEm1cjG2sFj3RNu5ASt6p6hr77EwWK37Ga0beNPN4GD68QiZJeFCqgUcban1SDc4neZ8EBXB1ykcYOikf+Ri+aNNkkpYEpExIcNis2psrLAfbgOvVoSjAnAIdYrMbQhwPCBwRNtRDkk2SKkizyl9S3k9p/2j3jnoj+RlFWdAw7tC4DUwkbA+OHgsLCoirTrPKFhR4kOZZnB9hpRNplk2ARmPhTAiraRoR512oDSbUM0AGYhyw6qqYXLvifAzJyPnMztE2yHzpMx2oH5bU/VnR2Xi18Z7garkWPB1iEdkfIlf2E3yyfAO0MZXbJaCjPtCcMRjufR+4OlonGn2NuG4LaVuSz0OOEQ+ZBJC4CgcQFqBVuEhA9kGswRENEYISS3ok+BR9cm1eEl4FPEchf2btIi9KyWUuzTrkVcIY8SH4wLSyr3VIosiVsopBb1Led1Bpy7ZP/fs1+QeHDgaGhaeXJze1K0eo7LByFDoMxgZ4EOAo3aUyYYrmgEy7goB8QiKznz/gH9HfOW6me2wFI9VVf9qQb/mRlngqUufHA6CaP9x/8n39vvtOxwUFRzbnaLfLH2wWnJvrYTCgVs5Hw9xhoYz2vBA0bgI9kWEo2p8HR9uiL8cEVgH9Tg0gMIBvSm6UQIXIuQOExMsjwgPH8HzbFWNJ0Wk4f4UjqeqPgKHpWaAjwd4hQ7goG6DdTiErg86HKjjFnOdhwNmy/vE+fMXbhemNRgrR2jt6goZlnC4hQzwUWlcv13SA8d3NTh2Nccosx1iQSsXD0jrRtHQQn7v8J3GtqSa5kR1123daFbHWvHwJjI0PmpCSHyQd5+ZD9QsmZey5TkFnycJDtqkIqdWPMcCJUgQowV9BA6fAMhVxNk4igJ1FZQkxgR5bMXIRsXIYun9U/5RJAN6Bxw6Gvq0oBdFk9yE0oRCXlvpfTgkm8pRfI/nNvpABt6TxdyuQH+OcuCl2gr8vsBi/9FQv4CrMdG5d7NajVWjFpphN5uYahO5ZoCMkdrpLqSV1NoRhz4D9oIFSyXybEI1g96Wt6+Uty+dDLu55+CptrgK2+IhdEvRHIR+qAbWi4Y2AUTxvc2Se+vFw6vFQ6vkFnFvpZggYkouAh8bdz8bz+3yORZm4dgJHLf1pg6mcILpacYt4BjJ76Fw4IHeR0OfoKNVNSYBJMBkegjpgW5Vjg5ltn0s9GQpHE/yezbKhYRCDTK5FagV0p9tOFLxC5Ly1dJt0MZo72IOB45PUXX7nqOxz/ecFCH7j4YcOh7u6x8VEHwj+lJm9i1NXVF/L/qhQr+LaYbTZMjhcLI2oT7DnIzlcrQ4O9dTSnrw0TzjFzGZ1iLVtKZuGKtpSdlCfRkayeSNI34NiVlsM0t8mPRDTDEPNsseJp5PRSayyL4SHOhDwDAKrQja5xZu0Z8YyevZf4QoBx6IV9h0S4uswegRDoS+OHEVJMBZ2Y0Sqk8UjvE8AQ6RDEHJBM0g+Jbc3yp7mBedK9czsX1+QYJD/H3NW+b5PdZw7D8WGnA2NjIy/dKlDDGiMi5HZURfyroanRMfU5iWWFWS0QwsutSjQ9opCzKc8BlUM0CGCQ4lcxNubcJ8hqQZhAxEBfgwrGJW8od9J66fjcdEQOSDjgzMG2JWfAzw+Bg28QHpLvusOvbuBzzfLsChw8ddrCbE2Yd4pgU4uhkcOIUpkRlolghTEvE+IlLS0GSz/FF0iGCQfQIlOLqhW5JamDQDZOBFAg4baUWAQyRD8qFCQqHzlMUco0VaOeoflRRfpinsrS8dqishUS9EQ8lQY+lwW/lDJJE+zcSQ1tQGZZphlwxObQIs5GQQOFRCWgEcbJyGAzZOw4HCbFKOOkXAgpIBOCo7Vksap4+fi4XHTAhNQuWyRitbRXxQ8RD0w5RfCB9rwrtff7Pq08PBFgmFJGAf0gRru6VDiQtPQHplmHpIpxkHmxUjI7ld+0nzjSgHbETg6cvLpQ82WK9Tdmc8HOljStV/5Hg4/VlmcBC1ICaDCgZll8BR+iD/sg3lKBoyK19lZGDCYA0HGZ6l6rs1T4f0c4P62SEWZFwiBlULC81wJZsAi1GEZrobcNypHbE/a92uZoAMAgdGJIa13JrPfE5fRtsjIiDms9t16HysiHBYmVOWX2hWFpOLWX7ZLL2/UjRUdKXgY59ADhmHgzBhEeDQwquKhlGoKQRKCCioMuRwgA9A9iCrA9CIDAkjNFaJ4Hk6buuZRElwdImtF4EMhgXsEUwS4MizD4dUoSC3ymewi9mdgYLtxauiAThyJTgYGQwL+TgNcDDNcAsZJjiYbDihGUgoFprB4KB8pJcNePtHoiPpczS05FLOVHorusJrGMJJycVUvDA+RP8h5hf4UzSe14uGe1PqIoJuwCjgJLF3kB3sOxZKp7JtsBGoJqgnQAeC1ZxECR4/zjEy5cBjkVmqYsuo0sjvKRw/BBxZl3OYgRDhyAUcgmbI6inJPgOO+3zlOJ+6iTrWBhnLud0CHGbVCgcOUTDICF4Oh9vJsITD7WQADszf1e0rt1UG8IGTij7SyRMXciLSB5K189mG9fw+MkpQ9WOmgEBPbE01sFY4sF44iPpWKF6G14sGJ3M6G29WRZ+N/8QniDTHpA+W/AAV3fGgGP+QOFjUDiGtoGoQQpzY0bkdIBiTpRU8A57wWmgiGebRwZ5wK94ZKlL6IDTgGhsQCnCETOZ2wfSgB7NR+gC3KLmluIdqa6v0YQFPOVLOp24VDQujk/71AkQfCUxPpAEKyv4gnnL0aJ4O6+egHHLN8DQZY2Ja0Yw49BkYmghBeqCsNrH2GTSbgAkawsoMsnKnsnUxKa/V5/SlD73PIM2jDYzOVYBf1M3QpNLovOb4it5k7YPUhsdpzSPpLY/Smu+lNnQla/Vx5bmXsi+fjfM9Ho7TQxqUPCwoIodOXrwcW3z+Svb7B0/hdGK+fy0kEWfdKpIig2Px0xlYMB8Hfc9dDUmwuid57OWz8XuPYLWEaYSBNBQVHHctJAEPMY+bV0NuXj13MyYk4ZRfpDzroVr50DvwxIkLMeduXj0bL0WccIDbuKvB5PZKcCxeCTVD9OVR5RDhkEyGHAtPZBNoBshA9MBzpJnDYduBgg8TGfazCdUMYCEEWZxR0TyXnNeGBjma4vj84e0GJTjfAAUHeC9wDg74njvoG4JSAicA7xGUBnqO+8jfaHZS5QcHT1wIu5xZUNJ3PbFiD/Tp4Cn6QDzWOvC08sfiGK/Hzv3lZNAHWj+nxVcsFlgAjk8OB+OF2fkp9BksfpYIRw1RDkk2TMt25GTYrU3sdbpo1UodKLBgZAhwDBI4WEKxTYaZZigmY4mu6aKLd8qbZlMLjYEY6B8NwfnA8i35ScL7AiCkMH1S5fexPv74cLCPf+T56Oysgs5a/ZRGP3E1vvRowJW9viHWd+Z+Baft0MkLB46Hc79r/UXkr31HQ/Eo629xv4Lf9ODx8ODQBP/AmEPHz3PvY+uLgCMvVd9b85Su5rKlGZ4gY0wz1aOS4GBYOFebyBMKyyZyMjCFR1Q0zWaXD0XdLDkaePVTLP4TVMTWW2P36wArCA70RPD16LiSvOLeWv1kQ/NCY8uitm6q+O7QyeDrew4iDZnxx31CnOyA0JvXYovBxweHMCJ2wKWPX0R4xB16Z+4TWnwRv+OB42HXruVXqnqio3NQTAkfDAc/hT4JgSNFgENYB0rrVXrrCQdKswlux0nw4FDQHTd1umhhwiPDTDMoGbitaVuqap4v0owm57SEX8vFqs99x8NwevBeSKDYOZ34Fvku1GI/VowGXkUqSU6rK618oGuYARkEjuaF5pYlff3MjcTyUyFxOIVEimgis3H70eHAoPDErOyW6OuqYwFX0K62c3/8dP/g68lJ6kvR2X5BMdAnO3em30IZfOBY2PUYVVPlo4KMppDw5CN+kfiVHT4QdxDg0BHlMIeDkeEJzaBkAI5eKEe6ZoTJhhUZZj5DuQO11gzKB+CoaUUsVjRMF1Q9SM5pjoovCbx4W1gbHIFFwmhUfHIkGO+dPKDhkBnoxMGTF3wDrpwJT4yMKUhK06vKBqp1T+ub5hkZgINE04K+bio733D2YgqSDj7rduKwf2R4VHpxUa+uZvTOHf2ZkHg7dz5yKiriUmZ5YW+DeiQ9VX/mXBzujDV59uNkwNWk+LvNlY96dNPaksGYa3nHTl+mDzkiPRYH1nEuNKEovbFPSCtMNpSR4bgHyvUZYIKFGRz2yeD6DFaYyBwoXzOobAhkLGlaSdS0LFY2zBRrRrJL+5Kzm2KSqyJvqEIvZwZFpJwJTzoVlnAq9CbiTFhi4IVb56LSLl7Lu5pwNzFNn63qKq18WKOfrCNYLFqT0dS00Ng4X6l+dCez8WayOj5ZjVuzSFInJAuRpE5MVmdmNdeqH7fWz6grHqSn1yfii0IkJalZQC2SkqpuJVerctoaq8c69NPq0sH0VF1yYtUt87idWGURabdqyvONBs2T/rrZ9uqx0pz2O0nVKQmVqQlVJBKFW+H4TkKVLCqRUxqKBwdrxaGJpx0ow+KJZgphgsOKDDMHqlgzlJJB+ahtXUJomufVjTPluicl1Y8LKu7llvZnFXVnqowZqs5MVWdWYVduca/q7lBJ1cNKzViNfkrfOFdPkgiw4JMBOBANDbM63YS29olWS0JHo/aJrvaJXoi62ic0GrQTIKO9cR63jbVP6zXjDVI0asYba8bpbZNmHNGqneismzXWz3Xoplo0T5prxlpIjNNorRlvrR6j0VY9RqO9etxYO9GrnwEcvbppo+Zph3oMYZBFp3qMhlE9ZqxCjCK61WMDGlxbIFYoTDPc1QOV1yaMDBwQOGqmegsGvTI0I06QwfMZ4vUmtDZhPsNaM+RkAA5t66KW3C5pYScRzQu1zfPaJjF0TfP6ZsRCXfNiPYkl3DIsqM9g2YRigdtmKVqaFlulaGtabGtaoNHeuNDeJAQOSMwjOhpIGBoXEJ0NYhgbFoSY72ogASy6pOiun+9pEAIH9fO9NOrm+xD1QtTN99fNCTELMkjoZwf0s4OYldRhXDI3VIfulhikXhXinm5OWBhsWjgu1wwuGRZXFdBFoHSWZjFRc5hNKBmAo88CDlc6XY58hphNeGQITLQs6qTQtyzSqGtZFEMkg/JhgkPEoplIBQtGBg5apGhtXBBivq3RFJQJORkEDik6G+ZZGBvmgIWcDCDSLUVP/RyJOhK9UvTVzfXVzdKQkwE4aGCWRoPNTYZk3XEmGA7JkNaBOtnPsNYMkGEJhzUZXJ/hbs2wSQb4sEEGKUwUaIZSMjokzfAEGSIWkmbYIYO1uWz1M7ia4S4yqM+gWDytmUIIylFD0oo1GR71GVI2IWQwwcAB0wzbZNjzGU5ohiMy5tyuGUwweFP4nZioyfoZptqEZRNKhghHpmaELuiSd8c9T4ZgNQSTweCwT4ZDB8rIYKkEByybtPKyiSMy5t1OhmA4LLOJXDPksrHDDhSywcjAQT88R1bNYwoHkggL6yk8r2p1xYF6KptwfYZTZLhfM3YTGaQHSsNaM0DGhBwOExZ212fI+xm0KnGqNnGCDMtswuyneW3yBfUZ5EL4XaIZwIKGqByMDBwo0wxn+hlynyG3GvaziVC4KnKgXM1wqjbZIc1wWJtwu+OeqFrl2cQmHNZk7ILaxFIz0B1nssF8hnIyHPkMExnywtVjVatNzeCS4a7ahHW6LHwGIwMHA/Ac6ZX3iWDwNOPzJUN5p8sTZLBOF7efwZoZOLDfz+DWJnIHuoP9DHs+Q47FZM0Uoje3zytR1VVuwGVISmatO+xAFWmGWW0ilifzXAfKeqDu7meIzS53dbo+X82gZEzVTDenNHslqboqsK+GdL0J1EIuGKIDJVsxuUoGK1mV9TPc7DOUZxP7muHGHugucaC0NqHKQcmYrJ4CHC2pLV4J+QYKB8XCAg47K3fMp/DOdMdd7HSZaYbUHVeuGWiTS91xsTUuNxncbOIiGQ6zyc5rhnU2ARmI6ZrphuR6ryt3dJWGVUYGr5+xc7UJ12cw++mZqtXkQO1rhos+w2Ft4tHuuEMHyjSDyEb11Ixmuup6pVdkYiUuXbSGQ9KMnSPDE1XrLskmntYMcpmasDzY/hReXpvY0oyp6kkE4Ci5XOx17kq+unMNcPA0w1Wfsc1+hiIHuvO1iYvZRK4Zu9lnUM2gcMzVzmSEpnudCEmuNm7wyNiGZqDBxUJYn2GzB8qdwrs4N+F2ujyqGdxZq92qlfQz3FW10usJ7FxVwFrj3GzC1QykEiGIbExXT87Xzsb7xXrtOxZV07XJ4JCyiUc0g0uGfPEOW5+hvNPFdaCOyNihiZqkGTY7XbvEZ1iQATgWdfPh+8O8fvfB8Vps1yykFXeRobxq5WoG14Hu5mzC1QyJDLOhiXzljt3axA0rhG1N1CyqVnk2ARY0lvWLR37n4/Xmv72r7SVwOEEGSyUuzE12wmfIqlaXNIObTRzOWndJNuH3M8yzCSVjpnpytW7pD2/+3uunv/iNtmeLkeGJWSs3m9ivWqETLLj9DKd8hktkYMGfdQ/UOc3YTdmEmAzqMxgZgGNFv/irn77t9aM3flnbtSm/rnWnpvCWPVBuNuGS4ZTPUNrPsKpN3Nwd301kwISakQE+QAZiSTv/1j+86fXa3/5TTee6691xbtWqXDO4DnQXkLG9FcLyfoa8PGFrurg+Y8em8BadLltkzMKQ1s7+5LUfe/31//gB+UMF0t8qgGxs86oCm1Wr7e64Is1Q7kAdTdSc1gxCBtdn2M0mjqtW0MBCmsJvw4GyRaDCda2yBV3C9SYOO13WtQkTDCIb6sm56qm56snv//VrXt/6y1fvNs1iI/rdn02c8hnOkSEKhgkO6XoCunycwcGuKpBrhrscqHwHN+XXm3BX7tjXDJpKKBmzAhwT5WOvfus7Xl//xp8XacerO1Y8rRlcB7qbswlXM3asNnGRDG6ni1u1mmRDPQkyEPM104+L7n/z63/m9eJLr2SWDWoMax7NJsr7GVyfoVwzZFWrc5phbj8VXG8i72dwfcYDnZ2/lrWNbKJ8bmK7auXXJkwzKByLmpneTOMrL77s9cwzX47PaNIa1xkc0rXwpim88n6GcgeqvDZRToY0giezeKeuKjC3n9skY5dkE65mOPQZFAvczqknl2vn6uJrv/zMl73wL/xqgb5ry0PrM1zMJk6RYdIM+RINV9aBMpOBA+YzHGuGsr+JZL3vuNNzE65mCNnEUjOsswklA3Cs6RbzwrMIGfjn43elvofA4YpmuFibuC+bOKcZ9rKJQzK2rxk7l02Uk8Hg2KhbvuwTSdnw+s3vD9b3blmTgYueWUJxYtbKnah5OJuYNMP+yh3zTpe9bMIlw7XaZBtkeKJqtaMZkA3EZt3y/l9/KsLxw9f/WW/ckO+ssq1r4ZVrhvLaxMVssh0yRM3491m1UqtBmaC38+rJVe38z//uf4tw/MV//Tb2YdK0rVAmPESGcs3gdscddbpcyiZKydDNyn0GN5twe6BOdLrcUZvY6I6rSaeLYmEBB8hYwBrSspFv/8VfiXA899wLdwqMOsMag8Msm9A9VWSXw0MqWIjliaP9M5RrBpeMXbY+w+YU3tW5ibTUj0uG9S4JtN/FyhPW6WLLdqwnahZVq4VmAI5lzazhdvMLzz0vwoH/BF9Ib+jaAhwMCxwwn+GJ9RkuOlBZ1crxGawwwQHbWYW7QninOl3b8BnKyWBY4MCcDEvNsOiBWggGEAEWQkxs6BbuBCSbyMDRr//f/sYeMzgYGdyJGtdnKK9alc9NdolmyB0ov9PlyapVuWZwaxMuGeCDyQYjY75qYku/tO9Xn5jB8ep3XyNS0bZMlcNZMixX7nB9hotk2O+BcjXDvDb5ojhQ8epF5WRsq9NlTcZC1cQiPEfV5Guvfs8MjueffyG9wFhnWHMum3CvKuCS4dFs4skrkRzPWmE4rGatzu3TZdpwh7tCmNvpcsVnzKsnQAZitWbGcLvphedeMIMD/3PE70pTzxbTDOU+g0uGcgfqqapV2L7NRc1wWJu46kC3f70JlwzuRI2bTZhgyH0GJQO3yClXvCMsycD/v/Y3P6nrWGVbPjI4WGHios/4wmmGa2S46kC5mmHpQIVLF5X7DA4ZVRPwGRSORUE53vje6xw4vvLss4lp9Q2GdeUO9IvTA/2i+AxTQrFeO25JBioUcXmwZW3isAfKHCjTDBys187Vx9b8ybN/woEDX/o/b+9p7tpSqBncbLJLfIbyqtUD3fFt+Axud5xohrATqLI1XZYTNSeyCTQDsaVf3PPLP/LJwFdffOnlLFVPQ8ca+LCfTTxBhqMeKKef4aID5ZLxBcgmgmZIssFfISzvgXKyCalKxGyCA5pQeu+0/6eXXrEJB77x9m8+buna2nkyHPUzdpiMnaxNTBvucH2GbQfqBs2gZAiysfTpv31gjwx874UXXkzJamkyrFM+rLvjyjtd7nKgZNmOst2llWcTT6z2e6SdppuOfy7rM5zIJowMuI2WBN2Lz7/oAA58+x9//GZjx1pdy5I1GcodqIudLll3XOlEjUuG0okalvDI9h3f+R7oNjXD0oG6QsZS1cSaZvatv/+FYzJwjy996UsBZ5PaurYIHI4mai46UHf5DOVkeMBnbMOBKp+bcLOJ6z1QZjWoCaUJJdkv7kuK0BDu9PU//TNVyWBT+xqkggXdjl6+I72LZHjUZ3hiosYaoDiQpvAeIcN21epOnwEy1jWzQxlGstB8W/9+9I+/aGhdamhZllKJornJNnyG8MdNsLGfW/f2M1/TpRf/vonFxSYQD7YOVD5R467PcKIHarZ/xvan8LbJcGc2ARnLGNBXT/3zD3+2LTDEO7//wcl245ZyB8r1GbtkfQY3m3iCDBevN+FmE27VKvoM85U7vKrVVLIyBwoyYDXQLD/5B19nyMBjnnnmmcDgREMX+CAXMNrfWWUbmuHg75twahPls1ZPZBP3TdR2RdUqklG3nHTyxpefecZJOPCwr371pctXVeCDkbErfYZ5NlFwvYmkGc71M7YxN+H2QLlTePdnE1mby1ozCsOzX3pBQe1qn51XXvlabHxFp1Hgg7fvuBOagTUZLGRVK0czlPdAuZrBzSbyqtVdPsMT2YQ7hXdubgK1oEGzSeWloq+9/DX7513pd8FH9FWV0bjFZAP2goYTZNhwoC6Rwe1n2CXDsWZ4ojZR3s9QTgZ3TRcrWS01o24ZmuE2MihByC/BwYmdnVstzUtffDK2t0JYKlz52cSsNrG7PmOHsom0cofywTRjWT0FBwqf4YZsYq0q8KcffHAScLS3rcoLE4gH+2tZbOUOulssnOhnKHCgTvuM7ZHxOfUz3Fy1op8BOPzeOfrMf3DBgVozYfGV119/s6R4oMu41dq8SHOKNRlAxBUyPOEzXHOgO9zpcicZS+pJCMZgRudbf/9zi1Ppkf/9xje+ee5sUkfbqqF97XMkg+szPDBRm3ZxoqY8m9jrZwh77tBLCuQmg7vaj/kMTNQwN0F3/M+//k2PoGDrSd/4yb9kpTd3G7YMrSssm7ioGdxswp2bKK9NJM1wZzbh+gxu1cp1oLarVjd0x6nJWNPMQDAwa/0l9n37XP5hvv/b//tpcUF3j2HT2LbKUgkOnPAZLmYTD2gGP5twyTCfqJmaXQpX+3E1w4mqFWRALbZ0i92prVif4RHvuS3UXn75P//67Q/SU+o6W5b7QEnrckfjAh2aeKJq5WoGlwypn+G4av18e6DcqnVbU3hcb7JSQ6RitWYa60A//Nf3XrG/pmtbJ9j1O3/lK8/+3d+8cepEdGGOAUz0Gzb72je6W5Y7GxdklyFhzx2X+hnbJ8NmNmFXPLvYz+BmE+U+g03hoRMslJCBK56XNTO4ehFMwGQYU5qv+ET+02s/fvYrz7p+Nj31DM8//9X//t3v//63+yPD7hRlG5prJ3pbVwcNm4MdmwNta30tyz1Ni92NC90N8wh5KoHhYNe1cq834ZLB7XQp9xm7hAzuFc/EeJJdH6ewgxv26cJuTGu6Beysgv0zsEsCroXHFc9pgcn7f/XJ91/93ovPf9VTZ9RDz/v8cy986798+/Uf/fyd3x44ffzyjUt5OSl1Vaq+hsrHHdpJwNHXvDzQsjLUujbcto7bwZaVgaal/sbF/oYFRF/9fD8J8213HO36KGUTohncNV1MM+TZxNTpqt2J1X74I2oI/LUs/NmbWc3MXO3sgnYOf6tgWb+AfcdX9AvYQxg7xYIM7PqIvf36Mo3Ypwu7MWHPnQO/2fuLH/4MuyRwLk3z0IncmafF/nT/8aVXvvGn3/yr//bq//zuD374gzd++uN/eetnv377X9/5+I++fj4XLgbcvHExK/V6WVZCTUlac3lmO0JfNNhYeo9EiRhNJfcQzebRUnKvpViM1uJhFm3Fwyzai4dJFA13yMJQNMyis2i4s3C4s2ios5CEUYquwiEa3YVDJFRCFA71kBgkoRrqUQ32StGnGupTDfYXDPWTWzHwx1oHcbecHvztRUTjrQb19ariS4WZoRlxfrHnD4Qf/p3PO2/9/lf/623sLo09hLFT7He+9R0sxsHefuIObjtznoSf8v8BfLJ4yYaP9UEAAAAASUVORK5CYII="
    );

    // Set authorization status to not determined
    window.cmp.setAuthorizationStatusIOS(0);

    // Set previous consent
    const consentV2 = {
        IABTCF_CmpSdkID: "300",
        IABTCF_CmpSdkVersion: "2",
        IABTCF_PolicyVersion: "2",
        IABTCF_gdprApplies: "1",
        IABTCF_PublisherCC: "US",
        IABTCF_PurposeOneTreatment: "0",
        IABTCF_UseNonStandardTexts: "0",
        IABTCF_TCString: "CP188cAP188cAAbACAENAbEMAP_gAEPgAAAAg1NX_H__bW9r8Xr3aft0eY1P99j77sQxBhfJE-4FyDvW_JwXx2EwNA26tqIKmRIEuzZBIQFlHJHURVigSogVryHsYkGcgTNKJ6BkgFMRI2dYCFxvmYtjeQKY5_p_d3fx2D-t_dv83dzzz8FHn3c5PmckcKCdQ58tDfn9bRKb-5IOd-78v4v09l_rk2_eTVn_pcvr7B-uft87_XU-9_cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQagCzDQuIAuyJCQi0DCKBACIKwgIoEAAAAJA0QEAJAwKdgYBLrCRAABFAAMEAIAAUZAAgAAEgAQiACQAoEAAEAgEAAAAAAgEADAwADgAtBAIAAQHQMUwoAFAsIEiMiIUwIQoEggJbKBBICgQVwgCDDAigERMBAAgCQAVgAAAsVgMASAlYkECWUG0AABAAgFFKFQik-MAQwJmy1U4om0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAACAA.Ig1NX_H__bX9v-Xr36ft0eY1f99j77sQxBhfJs-4FyDvW_JwX32EyNA26tqYKmRIEuzZBIQFtHJnURVihSogVrzHsYkGcgTNKJ-BkgHMRa2dYCFxvmYtjeQKZ5_p_d3f52T_9_dv-3dzzz9Fnv3c9PmdlcKidS59tH_n_bRKb-7Ied-7-_4v09t_rk2_eTVv_9evv79-u_t____9_9_8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAE",
        IABTCF_VendorConsents: "100100000111101100001111101100010101101101001000010100001011000000011111100111101101101000101110110000000000110000000010000101011101000110110000001000000001000010100001000000000000000000000001001000000100000010011000000000000101000000000000101001000000100000000001000000001010010010010000000001100000010100010001001010000000000100000000000000001000000000000000000000000000100000001001100100000100100001000000100000110000001000000010000000000000001001010000000000000101000000000000000000000000000000000000010000010000000000000000000000000000000100000000000000100000100000000000000000000010000000000000010000000000000000000000000000100000000000000000000000101000000000100000000000000000010000000000000000100000000000000000000000000000010000000000000000000010011001000010000100000000000000100000100000000000001000000000000000000010000100000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000010000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
        IABTCF_VendorLegitimateInterests: "100000000111101100001011101100010101101101001000010100001011000000011111000101101100100000101100110000000000100000000010000101000101000110110000001000000001000010100000000000000000000000000001001000000100000010010000000000000001000000000000101001000000100000000001000000001010010000010000000001100000000000010000001010000000000000000000000000000000000000000000000000000000100000001001000000000100100000000000000000100000000000000010000000000000000000010000000000000101000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000100000100000000000000000000000000000000000010000000000000000000000000000000000000000000000000000101000000000100000000000000000000000000000000000100000000000000000000000000000010000000000000000000010001001000010000100000000000000100000100000000000001000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001",
        IABTCF_PurposeConsents: "1111111111",
        IABTCF_PurposeLegitimateInterests: "0100001111",
        IABTCF_SpecialFeaturesOptIns: "1",
        IABTCF_PublisherRestrictions: {
            "1": {
                "1": 1,
                "2": 1
            }
        },
        IABTCF_PublisherConsent: "01010101",
        IABTCF_PublisherLegitimateInterests: "01010101",
        IABTCF_PublisherCustomPurposesConsents: "0000000000",
        IABTCF_PublisherCustomPurposesLegitimateInterests: "0000000000"
    };

    window.cmp.setConsent("IAB_TCF_V2.2", consentV2);

    const consentGoogleV2 = {
        IABTCF_idfaFlowControl: "2",
        IABTCF_UseNonStandardStacks: "0",
        IABTCF_AddtlConsent: "2~2072.70.89.93.108.122.149.196.2253.2299.259.2357.311.317.323.2373.338.358.2415.415.2506.2526.482.486.494.495.2568.2571.2575.540.574.2624.609.2677.2779.827.864.981.1029.1048.1051.1095.1097.1201.1205.1276.1301.1365.1415.1449.1570.1577.1651.1716.1735.1753.1765.1834.1870.1878.1889.1958",
        IABTCF_UserConsentRecordId: "277E81D6-5E13-4930-A0BC-4D61D60F3B29"
    };
    window.cmp.setConsent("GOOGLE_PRIVACY", consentGoogleV2);

    // In 1 second set authorization status to authorized
    window.cmp.onRequestAuthorizationStatusIOS = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(3);
            }, 1000);
        });
    };

    window.cmp.onUpdateConsent = (tcf, consent) => {
        console.log('Version:', tcf, 'Consent:', consent);
    };

    window.cmp.show().then(isFinished => {
        console.log('Finished interactions with form:', isFinished);

        const body = document.body;
        if (isFinished) {
            body.classList.remove('show');
            body.setAttribute('style', 'display: none');
        } else {
            body.removeAttribute('style');
            body.classList.add('show');
        }
    });
}

