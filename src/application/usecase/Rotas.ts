import AccountRepository from "../../infra/repository/AccountRepository";

interface Location {
    accountId: string;
    name: string;
    email: string;
    phone: string;
    x: number;
    y: number;
}

interface Route {
    path: Location[];
    distance: number;
}

export default class RotasUseCase {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute() {
        let accounts: any = await this.accountRepository.getAll(1, 10, {});

        const companyLocation: Location = { accountId: "root", email: "root@mail.com", name: "Facilita Jurídico", phone: "79999889371", x: 0, y: 0 };
        let clientLocations: Location[] = [];
        accounts.map((cliente: any) => {
            clientLocations.push({
                accountId: cliente.accountId,
                email: cliente.getEmail(),
                name: cliente.getName(),
                phone: cliente.getPhone(),
                x: Number(cliente.getCordX()),
                y: Number(cliente.getCordY())
            });
        });

        const shortestRoute = calculateShortestRoute(companyLocation, clientLocations);
        return shortestRoute;
    }
}

function calculateShortestRoute(companyLocation: Location, clientLocations: Location[]): Route {
    const locations: Location[] = [companyLocation, ...clientLocations];
    const n = locations.length;

    // Calcula todas as permutações das localizações dos clientes
    const permutations: Location[][] = [];
    function permute(arr: Location[], l: number, r: number) {
        if (l === r) {
            permutations.push([...arr]);
        } else {
            for (let i = l; i <= r; i++) {
                [arr[l], arr[i]] = [arr[i], arr[l]];
                permute(arr, l + 1, r);
                [arr[l], arr[i]] = [arr[i], arr[l]];
            }
        }
    }
    permute(locations, 1, n - 1);

    // Calcula a distância total de cada rota e encontra a menor
    let shortestDistance = Number.MAX_SAFE_INTEGER;
    let shortestRoute: Location[] = [];
    permutations.forEach(route => {
        let totalDistance = 0;
        for (let i = 1; i < n; i++) {
            const dx = route[i].x - route[i - 1].x;
            const dy = route[i].y - route[i - 1].y;
            totalDistance += Math.sqrt(dx * dx + dy * dy);
        }
        if (totalDistance < shortestDistance) {
            shortestDistance = totalDistance;
            shortestRoute = route;
        }
    });

    return {
        path: shortestRoute,
        distance: shortestDistance
    };
}
