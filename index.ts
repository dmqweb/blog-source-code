namespace Subject{
    class Observer {
        
    }
    interface Sub{
        addObserver(ob: Observer): void;
        removeObserver(ob: Observer): void;
        clear(): void;
        notify(): void;
    }
    interface Obs{
        update(): void;
    }
    // 主题
    class Subject implements Sub {
        subs: Observer[] = [];
        addObserver(ob: Observer): void{

        }
        removeObserver(ob: Observer): void {
            
        }
        clear(): void {
            
        }
        notify(): void {
            
        }
    }
}