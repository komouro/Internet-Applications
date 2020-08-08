import click
import json
import requests



@click.group()
def main():
    """
    CLI for Appathon@Ntua 2020
    """
    pass


@main.command()
def HealthCheck():
    url_format = "http://localhost:8765/Mouro/api/HealthCheck"
    url = url_format
    response = requests.get(url)
    printing_message = json.dumps(response.json(), indent=2)
    print(printing_message)
    
    
@main.command()
@click.option('--lat', type=float, required=True)
@click.option('--lon', type=float, required=True)
@click.option('--num', type=int, required=True)
@click.option('--service', type=click.Choice(["web", "local"]), default="local")
def NearestStations(lat, lon, num, service):
    url_format = "http://localhost:8765/Mouro/api/NearestStations"
    #print("Lat: {0}\nLon: {1}".format(lat, lon))
    #print("Num: {0}\nService: {1}".format(num, service))
    url = url_format + "/" + str(lat) + "/" + str(lon)
    url = url + "/" + str(num) + "/" + service
    #print(url)
    response = requests.get(url)
    printing_message = json.dumps(response.json(), indent=2)
    print(printing_message)


@main.command()
@click.option('--lat_src', type=float, required=True)
@click.option('--lon_src', type=float, required=True)
@click.option('--lat_dst', type=float, required=True)
@click.option('--lon_dst', type=float, required=True)
@click.option('--num', type=int, required=True)
@click.option('--service', type=click.Choice(["web", "local"]), default="local")
def ConnectionRoutes(lat_src, lon_src, lat_dst, lon_dst, num, service):
    url_format = "http://localhost:8765/Mouro/api/ConnectionRoutes"
    #print("Lat_source: {0}\nLon_source: {1}".format(lat_src, lon_src))
    #print("Lat_destination: {0}\nLon_destination: {1}".format(lat_dst, lon_dst))
    #print("Num: {0}\nService: {1}".format(num, service))
    url = url_format + "/" + str(lat_src) + "/" + str(lon_src)
    url = url + "/" + str(lat_dst) + "/" + str(lon_dst)
    url = url + "/" + str(num) + "/" + service
    #print(url)
    response = requests.get(url)
    printing_message = json.dumps(response.json(), indent=2)
    print(printing_message)


@main.command()
@click.option('--stationtype', type=click.Choice(["source", "destination", "both"]), default="both")
@click.option('--service', type=click.Choice(["web", "local"]), default="local")
def WeatherConditions(stationtype, service):
    url_format = "http://localhost:8765/Mouro/api/WeatherConditions"
    #print("station Type: {0}\nService: {1}".format(stationtype, service))
    url = url_format + "/" + stationtype + "/" + service
    #print(url)
    response = requests.get(url)
    printing_message = json.dumps(response.json(), indent=2)
    print(printing_message)


if __name__ == "__main__":
    main()
