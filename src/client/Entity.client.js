const EntityClient = new Promise((resolve, reject) => {
    try {

        // TODO fit into the environment, code comes from another project

        // TODO prevent construction of multiple Entitites with the same uid

        const
            socket = io(),
            emitter = socket.emit.bind(socket),
            entities = new WeakMap(),
            secretSymbol = Symbol();

        class Entity {

            constructor(param, secret) {
                assert(secret === secretSymbol, "@private Entity#constructor");
                assert(param && typeof param === "object", "@type {object} param");
                assert(param.uid && typeof param.uid === "string", "@type {string!} param.uid");
                define(this, "@id", param.uid);
                entities.set(this, param);
            }

            get param() {
                assert(entities.has(this), "expired");
                return entities.get(this);
            }

            expire() {
                assert(entities.has(this), "expired");
                entities.delete(this);
            }

            async update() {
                assert(entities.has(this), "expired");
                let update = entities.get(this);
                assert(this["@id"] === update.uid, "param.uid changed");
                let param = await emit("update", update);
                if (!param) return;
                assert(typeof param === "object", "@type {object} param");
                assert(param.uid === this["@id"], "param.uid missmatch");
                entities.set(this, param);
                return this;
            }

            async delete() {
                assert(entities.has(this), "expired");
                let param = entities.get(this);
                assert(this["@id"] === param.uid, "param.uid changed");
                let uid = await emit("delete", this["@id"]);
                if (uid === this["@id"]) {
                    this.expire();
                    return true;
                }
            }

            static async get(uid) {
                assert(uid && typeof uid === "string", "@type {string!} uid");
                return new Entity(await emit("get", uid), secretSymbol);
            }

            static async find(param) {
                assert(param && typeof param === "object", "@type {object} param");
                return new Entity(await emit("find", param), secretSymbol);
            }

            static async create(param) {
                assert(param && typeof param === "object", "@type {object} param");
                return new Entity(await emit("create", param), secretSymbol);
            }

        }

        socket.on("connect", () => resolve(Entity));

        function emit(event, data) {
            assert(socket.connected, "not connected");
            assert(event && typeof event === "string", "@type {string!} event");
            return promify(emitter, event, data);
        }

        function assert(value, errMsg, errType = Error) {
            if (!value) {
                let err = (errMsg instanceof Error) ? errMsg : null;
                if (!err) {
                    err = new errType(errMsg);
                    Error.captureStackTrace(err, assert);
                }
                throw err;
            }
        }

        function define(obj, key, value, get, set) {
            Object.defineProperty(obj, key, get || set ? { get, set } : { value });
        }

        function promify(fn, ...args) {
            return new Promise((resolve, reject) => fn(...args, (err, result) => err ? reject(err) : resolve(result)));
        }

    } catch (err) {
        reject(err);
    }
});