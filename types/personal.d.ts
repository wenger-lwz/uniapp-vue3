declare namespace Personal {
  interface User_Login {
    /**  登录邮箱 */
    email: string
    /**  登录密码 */
    password: string
    [property: string]: any
  }
  interface User_Register {
    /**  登录邮箱 */
    email: string
    /**  登录密码 */
    password: string
    [property: string]: any
  }
  interface User_Resetpw {
    /**
     * 邮箱验证码
     */
    code?: string
    /**
     * 登录邮箱
     */
    email: string
    /**
     * 新密码
     */
    password?: string
    /**
     * send发送重置密码验证码邮件,reset重置密码操作
     */
    source?: string
    [property: string]: any
  }
  interface User_address {
    /**
     * 地址id编辑和删除
     */
    addrid?: string
    /**
     * list,delete,edit,add
     */
    source?: 'list' | 'delete' | 'edit' | 'add'
    [property: string]: any
  }

  interface User_address_Add {
    address?: string
    /** 地址id */
    addrid?: string
    area?: string
    city?: string
    company?: string
    country?: string
    country_code?: string
    email?: string
    first_name?: string
    /**0,1是否默认地址*/
    is_default?: 0 | 1
    last_name?: string
    province?: string
    /** edit,add */
    source?: 'edit' | 'add'
    tel?: string
    zipcode?: string
    [property: string]: any
  }
}
