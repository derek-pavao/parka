

export class StatusModel {
    status: string;
    statusMessage: string;

    constructor(json?) {

        this.status = json.status;
        this.statusMessage = json.statusMessage;
    }
}
