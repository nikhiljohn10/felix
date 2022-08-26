declare module "@hapipal/haute-couture" {
  import {
    Plugin as HapiPlugin,
    Server,
    ServerEvents,
    ServerMethod,
    ServerMethods,
    ServerCache,
    ServerAuth,
    ServerAuthScheme,
    Dependencies,
    DecorationMethod,
    HandlerDecorationMethod,
    ServerMethodOptions,
    CachePolicyOptions,
    ServerStateCookieOptions,
    ServerExtType,
    ServerRequestExtType,
    ServerExtOptions,
    ServerExtPointFunction,
    Lifecycle,
    RouteOptionsAccess,
    Request,
    ResponseToolkit,
    ServerRoute,
  } from "@hapi/hapi";

  import { ServerViewsConfiguration } from "@hapi/vision";
  import { ServerSubscriptionOptions } from "@hapi/nes";

  import {
    Service,
    ServiceFactory,
    ServiceRegistrationObject,
  } from "@hapipal/schmervice";
  import { ModelClass } from "@hapipal/schwifty";
  import { Root as Joi } from "joi";

  type OneOrArrayOf<T> = T | T[];

  export namespace HcAmendmentTypes {
    type Decoration<T = Server | Request | ResponseToolkit> = {
      type?: "handler" | "request" | "toolkit" | "server";
      property?: string;
      method: DecorationMethod<T> | HandlerDecorationMethod;
      options?: {
        apply?: boolean;
        extend?: boolean;
      };
    };

    type Expose = {
      key: string;
      value: unknown;
    };

    type AuthScheme = {
      name: string;
      scheme: ServerAuthScheme;
    };

    type AuthStrategy = {
      name: string;
      scheme: string;
      options: object;
    };

    type AuthDefault = string | RouteOptionsAccess;

    type Dependency = {
      dependencies: Dependencies;
      after?: (server: Server) => Promise<void>;
    };

    type Method =
      | ServerMethod
      | {
          name?: string;
          method: ServerMethod;
          options: ServerMethodOptions;
        };

    type Extensions = {
      type: ServerExtType | ServerRequestExtType;
      method: Lifecycle.Method | OneOrArrayOf<ServerExtPointFunction>;
      options: ServerExtOptions;
    };

    type Cookies = {
      name: string;
      options: ServerStateCookieOptions;
    };

    type Models = OneOrArrayOf<ModelClass>;

    type Services =
      | typeof ServiceFactory
      | OneOrArrayOf<Service | ServiceRegistrationObject>;

    type Subscription = {
      path: string;
      options: ServerSubscriptionOptions;
    };
  }

  // Make a list of all the methods we can bind to
  // using the exiting typings. Server methods should
  // augment when you install respective plugin typings,
  // such as Nes or Schwifty, and become available in
  // this list
  type AllAmendmentMethods =
    | keyof Server
    | `events.${keyof ServerEvents}`
    | `methods.${keyof ServerMethods}`
    | `cache.${keyof ServerCache}`
    | `auth.${keyof ServerAuth}`;

  // Turn the union of those strings into a type
  type AmendmentMethodFilter = {
    [_key in AllAmendmentMethods]: never;
  };

  // Omit any methods or properties that cannot
  // be leveraged by Haute Couture
  type UsefulAmendmentMethods = Omit<
    AmendmentMethodFilter,
    // Readonly properties
    | "auth"
    | "decorations"
    | "info"
    | "load"
    | "methods"
    | "realm"
    | "registrations"
    | "settings"
    | "states"
    | "type"
    | "version"

    // Not useful
    | "inject"
    | "log"
    | "lookup"
    | "match"
    | "table"
    | "cache"
    | "start"
    | "stop"
    | "initialize"
    | "events"
    | "events.hasListeners"
    | "events.removeListener"
    | "events.removeAllListeners"
  >;

  // Known methods will be the keys of resulting type
  export type KnownAmendmentMethods = keyof UsefulAmendmentMethods;

  // This is the type used to check amendment methods.
  // Can be overridden to include custom decorations
  // that you might have on the server object.
  export type AmendmentMethods = KnownAmendmentMethods;

  // Enumerate the types that example can be so that
  // IDE can pick it up when it is an object
  type AmendmentExampleType =
    | AmendmentExample
    | string
    | number
    | boolean
    | unknown[]
    | undefined;

  interface AmendmentExample {
    $literal?: string;
    $comment?: string;
    $value?: unknown;
    $requires?: unknown;
    [key: string]: AmendmentExampleType;
  }

  // Amendment return type
  export type AmendmentConfig<T = Record<string, unknown>> = {
    method: AmendmentMethods;
    signature?: (keyof T | `[${string & keyof T}]`)[] | string[];
    list: boolean;
    useFilename: (value: T | T[], path: string, filename: string) => T | T[];
    example: AmendmentExampleType;
    after?: string[];
    recursive?: boolean;
  };

  // Amendment configuration override
  export type CustomAmendmentConfig<T = Record<string, unknown>> = Partial<
    AmendmentConfig<T>
  >;

  // Types that a place enforces
  export type PlaceTypes = {
    path: string;
    bind: unknown;
    caches: CachePolicyOptions<unknown>;
    plugins: HapiPlugin<unknown>;
    dependencies: HcAmendmentTypes.Dependency;
    methods: HcAmendmentTypes.Method;
    decorations: HcAmendmentTypes.Decoration;
    extensions: HcAmendmentTypes.Extensions;
    expose: HcAmendmentTypes.Expose;
    cookies: HcAmendmentTypes.Cookies;
    models: HcAmendmentTypes.Models;
    services: HcAmendmentTypes.Services;
    subscriptions: HcAmendmentTypes.Subscription;
    validator: Joi;
    routes: ServerRoute;
    "view-manager": ServerViewsConfiguration;
    "auth/schemes": HcAmendmentTypes.AuthScheme;
    "auth/strategies": HcAmendmentTypes.AuthStrategy;
    "auth/default": HcAmendmentTypes.AuthDefault;
  };

  // Amendment mapping
  type InternalAmemdments = {
    path: AmendmentConfig<PlaceTypes["path"]>;
    bind: AmendmentConfig<PlaceTypes["bind"]>;
    caches: AmendmentConfig<PlaceTypes["caches"]>;
    plugins: AmendmentConfig<PlaceTypes["plugins"]>;
    dependencies: AmendmentConfig<PlaceTypes["dependencies"]>;
    methods: AmendmentConfig<PlaceTypes["methods"]>;
    decorations: AmendmentConfig<PlaceTypes["decorations"]>;
    extensions: AmendmentConfig<PlaceTypes["extensions"]>;
    expose: AmendmentConfig<PlaceTypes["expose"]>;
    cookies: AmendmentConfig<PlaceTypes["cookies"]>;
    models: AmendmentConfig<PlaceTypes["models"]>;
    services: AmendmentConfig<PlaceTypes["services"]>;
    subscriptions: AmendmentConfig<PlaceTypes["subscriptions"]>;
    validator: AmendmentConfig<PlaceTypes["validator"]>;
    routes: AmendmentConfig<PlaceTypes["routes"]>;
    "view-manager": AmendmentConfig<PlaceTypes["view-manager"]>;
    "auth/schemes": AmendmentConfig<PlaceTypes["auth/schemes"]>;
    "auth/strategies": AmendmentConfig<PlaceTypes["auth/strategies"]>;
    "auth/default": AmendmentConfig<PlaceTypes["auth/default"]>;
  };

  // Creates an amendment config
  export function amendment<P extends keyof InternalAmemdments>(
    place: P,
    override?: CustomAmendmentConfig<PlaceTypes[P]>
  ): InternalAmemdments[P];

  export function amendments<
    O extends Record<keyof InternalAmemdments, AmendmentConfig>
  >(overrides: O): O;

  export interface HcComposeFunction<
    ReturnType,
    Options = Record<string, unknown>
  > {
    (server: Server, options: Options): ReturnType;
  }

  type ComposeOptions = {
    dirname?: string;
    amendments?: {
      [key: string]: CustomAmendmentConfig<unknown>;
    };
  };

  export function compose<Options = Record<string, unknown>>(
    server: Server,
    options: Options,
    composeOptions?: ComposeOptions
  ): Promise<void>;

  export function composeWith<Options = Record<string, unknown>>(
    composeOptions: ComposeOptions
  ): HcComposeFunction<Promise<void>, Options>;
}
