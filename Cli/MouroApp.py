from cmd import Cmd
import os
from pathlib import Path


def Bad_command_structure(scope):
    if scope != '':
        print("'" + scope + "' : no such command found")
        print()
    print("Usage: Mouro_app COMMAND [ARGS]...")
    print()
    print("CLI for Appathon@Ntua 2020")
    print()
    print("Commands:")
    print("HealthCheck")
    print("NearestStations --lat lat --lon lon --num num (--service service)")
    print("ConnectionRoutes --lat_src lat_src --lon_src lon_src --lat_dst lat_dst --lon_dst lon_dst --num num (--service service)")
    print("WeatherConditions (--stationtype stationtype) (--service service)")


def make_command_executable(command):
    scope = command.partition(' ')[0]
    #print(scope)
    scope_dict = {'WeatherConditions': 'weatherconditions',
                  'ConnectionRoutes': 'connectionroutes',
                  'HealthCheck': 'healthcheck',
                  'NearestStations': 'neareststations'}
    if scope in scope_dict:
        fixed_scope = scope_dict[scope]
    else:
        Bad_command_structure(scope)
        return ''
    message = (fixed_scope + " " + (command.partition(' ')[2]))
    #print (message)
    return (fixed_scope + " " + (command.partition(' ')[2]))


class MyPrompt(Cmd):
    print("Welcome the command-line-interface (cli) by Mourogiannis Konstantinos for Appathon@Ntua 2020. Enjoy!")
    prompt = '$ '
    def do_exit(self, inp):
        '''Exit the application.'''
        print("Bye")
        return True
    
    def do_cli_Manual(self, inp):
        '''Manual for the application.'''
        print("\n\n----------\nCommands:\n----------\n")
        print("help                  Show a list of commands with 'help' or information for a command x with 'help x'")
        print("cli_Manual            Show a list of commands with specific information")
        print("Mouro_app             Interact with cli (HealthCheck, NearestStations, ConnectionRoutes, WeatherConditions)")
        print("exit                  Exit the cli-application")
        print()
    
    def do_Mouro_app(self, inp):
        '''Interact with cli-server.'''
        c = make_command_executable(inp)
        if c != '':
            command = "python ../Cli/cli.py " + c
            os.system(command)
            

if __name__ == '__main__':
    cli = MyPrompt()
    cli.cmdloop()