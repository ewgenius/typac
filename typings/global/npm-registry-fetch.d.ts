declare module 'npm-registry-fetch' {
//

import {Agent} from "http"
import * as npm from '@npm/types'
import * as npmlog from 'npmlog'
import {Response} from 'node-fetch'

function npmFetch(url: string, options?: npmFetch.Options): Promise<Response>;

namespace npmFetch {
  function json<T = any>(url: string, options?: Options): Promise<T>
  namespace json {
    function stream(url: string, jsonPath: string, options?: Options)
  }

  type Options = {
    agent?: Agent
    body?: Buffer | ReadableStream | object
    ca?: string | string[]
    cache?: string
    cert?: string
    'fetch-retries'?: number
    'fetch-retry-factor'?: number
    'fetch-retry-mintimeout'?: number
    'fetch-retry-maxtimeout'?: number
    forceAuth?: {
      alwaysAuth?: boolean
      email?: string
      otp?: number | string
      password?: string
      token?: string
      username?: string
    }
    gzip?: boolean
    headers?: {[key: string]: string}
    ignoreBody?: boolean
    integrity?: string
    isFromCI?: boolean
    key?: string
    'local-address'?: string
    log?: Pick<typeof npmlog, 'log' |'silly' | 'verbose' | 'info' | 'http' | 'warn' | 'error'>
    mapJson?: Function
    maxsockets?: number
    method?: string
    noproxy?: boolean
    npmSession?: string
    offline?: boolean
    otp?: number | string
    password?: string
    'prefer-offline'?: boolean
    'prefer-online'?: boolean
    projectScope?: string
    proxy?: string
    query?: string | object
    refer?: string
    registry?: string
    retry?: object
    scope?: string
  } & {[scopeRegistry: string]: string} & {
    spec?: string | object
    'strict-ssl'?: boolean
    timeout?: number
    token?: string
    'user-agent'?: string
    username?: string
  }
}

export = npmFetch

//
}