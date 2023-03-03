
from threading import Thread
from time import sleep
import subprocess
import os
import sys
Copy = True
services = [
    'absence-service',
    'administration',
    'employer-service',
    'eureka-discovery',
    'formation-service',
    'gateway',
    'gestion-employe',
    'messagerie',
    'offre_stage',
    'stagiaire',
    'user'
]
current = os.path.dirname(os.path.realpath(__file__))
builds = os.path.join(current, "builds")
if Copy:
    if not os.path.exists(builds):
        os.mkdir(builds)
# print(current)


# def run(dir_name):
#     os.chdir(os.path.join(current, dir_name, "target"))
#     files = list(os.listdir())
#     files = list(filter(lambda s: s.endswith(".jar"), files))
#     assert len(files) == 1
#     cmd = "java -jar "+files[0]
#     import subprocess
#     os.system(cmd + " &")
#  os.spawnl(os.P_DETACH, cmd)


def build(dir_name):
    os.chdir(os.path.join(current, dir_name))
    os.system("mvn clean package -DskipTests")
    if Copy:
        os.chdir(os.path.join(current, dir_name, "target"))
        files = list(os.listdir())
        files = list(filter(lambda s: s.endswith(".jar"), files))
        assert len(files) == 1
        jar = files[0]
        src = jar
        import shutil
        dst = os.path.join(builds, jar)
        shutil.copyfile(src, dst)
    print('yep')


return_codes = []
for service in services:
    return_codes.append(build(service))

for code, service in zip(return_codes, services):
    print("Return code for", service, ":", code)
