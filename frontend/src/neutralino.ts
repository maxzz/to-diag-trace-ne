import Neutralino from "@neutralinojs/lib";

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IniOptions {
    bounds?: Rectangle;
    devTools?: boolean;
    showMenu?: boolean;
}

export async function getIniFilePath(): Promise<string> {
    const configDir = await Neutralino.os.getPath('config');
    const appDir = `${configDir}/to-diag-trace-ne`;
    try {
        await Neutralino.filesystem.createDirectory(appDir);
    } catch (e) {
        // Folder might already exist, which is fine
    }
    return `${appDir}/init.json`;
}

export async function loadIniFileOptions(): Promise<IniOptions | null> {
    try {
        const filePath = await getIniFilePath();
        const content = await Neutralino.filesystem.readFile(filePath);
        return JSON.parse(content) as IniOptions;
    } catch (e) {
        return null;
    }
}

export async function saveIniFileOptions(opts: IniOptions): Promise<void> {
    try {
        const filePath = await getIniFilePath();
        const content = JSON.stringify(opts, null, 2);
        await Neutralino.filesystem.writeFile(filePath, content);
    } catch (e) {
        console.error("Failed to save window options:", e);
    }
}

export function fixBounds(bounds: Rectangle | undefined): Rectangle | null {
    if (!bounds) return null;
    if (bounds.width < 100 || bounds.height < 100) return null;
    if (bounds.x < -16000 || bounds.x > 16000 || bounds.y < -16000 || bounds.y > 16000) return null;
    return bounds;
}

export async function restoreWindowOptions(): Promise<void> {
    try {
        const opts = await loadIniFileOptions();
        if (opts && opts.bounds) {
            const bounds = fixBounds(opts.bounds);
            if (bounds) {
                await Neutralino.window.move(bounds.x, bounds.y);
                await Neutralino.window.setSize({
                    width: bounds.width,
                    height: bounds.height
                });
            }
        }
    } catch (e) {
        console.error("Failed to restore window options:", e);
    } finally {
        await Neutralino.window.show();
    }
}

export async function saveWindowOptions(): Promise<void> {
    try {
        const size = await Neutralino.window.getSize();
        const pos = await Neutralino.window.getPosition();
        
        const bounds: Rectangle = {
            x: pos.x,
            y: pos.y,
            width: size.width,
            height: size.height
        };

        const existing = await loadIniFileOptions() || {};
        const opts: IniOptions = {
            ...existing,
            bounds
        };

        await saveIniFileOptions(opts);
    } catch (e) {
        console.error("Failed to save window options:", e);
    }
}
